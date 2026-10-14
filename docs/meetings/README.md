# Meeting Notes → GitHub Issues

Drop your scrum meeting notes in this folder as markdown files (any filename,
e.g. `2026-10-14-standup.md`). Any action item written as a GitHub task list
checkbox will automatically become a GitHub issue once the file is pushed.

## Format

Write action items as unchecked checkboxes, anywhere in the file:

```markdown
# Sprint 14 Standup — 2026-10-14

## Notes

Discussed the new onboarding flow and flagged a bug in the signup form.

## Action Items

- [ ] Fix signup form validation error on empty email
- [ ] Follow up with design on onboarding mockups
- [ ] Write migration script for the old user table
```

## What happens next

On push to `main`/`staging`/`production`, a GitHub Action
(`.github/workflows/sync-meeting-issues.yml`) scans every `.md` file in this
folder, files a new issue for each unchecked, unfiled checkbox, and commits
the file back with the issue number appended:

```markdown
- [ ] Fix signup form validation error on empty email (#42)
```

Lines already annotated with `(#<number>)` are skipped on future runs, so
it's safe to keep editing the same file across multiple meetings — only new
checkboxes get filed as issues. Issues are tagged with the `meeting-action`
label.

Checked-off items (`- [x] ...`) are treated as already done and are never
filed.
