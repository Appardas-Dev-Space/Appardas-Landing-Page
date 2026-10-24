#!/usr/bin/env node
// Scans docs/meetings/**.md for unfiled action-item checkboxes ("- [ ] ...")
// and files a GitHub issue for each, annotating the line with the issue
// number so re-runs don't duplicate work.
//
// Usage: node scripts/sync-meeting-issues.js [--dry-run]
// Requires: gh CLI authenticated (GH_TOKEN/GITHUB_TOKEN env var in CI).

const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const REPO_ROOT = path.resolve(__dirname, '..')
const MEETINGS_DIR = path.join(REPO_ROOT, 'docs', 'meetings')
const REPO =
  process.env.GITHUB_REPOSITORY || 'Appardas-Dev-Space/Main-Landing-Page'
const LABEL = 'meeting-action'
const DRY_RUN = process.argv.includes('--dry-run')

const ACTION_ITEM_RE = /^(\s*-\s\[ \]\s)(.+?)\s*$/
const ALREADY_FILED_RE = /\(#\d+\)\s*$/

function listMeetingFiles(dir) {
  if (!fs.existsSync(dir)) return []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files = files.concat(listMeetingFiles(full))
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.md') &&
      entry.name.toLowerCase() !== 'readme.md'
    ) {
      files.push(full)
    }
  }
  return files
}

function ensureLabelExists() {
  if (DRY_RUN) return
  try {
    execFileSync(
      'gh',
      [
        'label',
        'create',
        LABEL,
        '--repo',
        REPO,
        '--color',
        'BFDADC',
        '--description',
        'Auto-filed from meeting notes',
        '--force',
      ],
      { stdio: 'pipe' },
    )
  } catch (err) {
    console.warn(
      `Warning: could not ensure label "${LABEL}" exists: ${err.message}`,
    )
  }
}

function createIssue(title, body) {
  if (DRY_RUN) {
    console.log(`[dry-run] would create issue: ${title}`)
    return 'DRYRUN'
  }
  const output = execFileSync(
    'gh',
    [
      'issue',
      'create',
      '--repo',
      REPO,
      '--title',
      title,
      '--body',
      body,
      '--label',
      LABEL,
    ],
    { encoding: 'utf8' },
  ).trim()
  const match = output.match(/\/issues\/(\d+)\s*$/)
  if (!match) {
    throw new Error(`Could not parse issue number from gh output: ${output}`)
  }
  return match[1]
}

function processFile(filePath) {
  const relPath = path.relative(REPO_ROOT, filePath).replace(/\\/g, '/')
  const original = fs.readFileSync(filePath, 'utf8')
  const lines = original.split(/\r?\n/)
  let changed = false
  let inFence = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const m = line.match(ACTION_ITEM_RE)
    if (!m) continue
    if (ALREADY_FILED_RE.test(line)) continue

    const prefix = m[1]
    const text = m[2]
    const title = text.length > 100 ? text.slice(0, 97) + '...' : text
    const body = `Filed automatically from meeting notes.\n\nSource: \`${relPath}\`\n\n> ${text}`

    console.log(`Filing issue for: ${text}`)
    const issueNumber = createIssue(title, body)
    lines[i] = `${prefix}${text} (#${issueNumber})`
    changed = true
  }

  if (changed && !DRY_RUN) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8')
  }
  return changed
}

function main() {
  const files = listMeetingFiles(MEETINGS_DIR)
  if (files.length === 0) {
    console.log(
      `No markdown files found under ${path.relative(REPO_ROOT, MEETINGS_DIR)}`,
    )
    return
  }

  ensureLabelExists()

  let anyChanged = false
  for (const file of files) {
    const changed = processFile(file)
    anyChanged = anyChanged || changed
  }

  if (!anyChanged) {
    console.log('No new action items to file.')
  }
}

main()
