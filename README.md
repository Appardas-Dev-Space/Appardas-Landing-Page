# Main-Landing-Page

Main Landing page of Appardas, It introduces the company, products, and the members

## Design tokens

Every colour, font size, spacing step, radius, and shadow resolves to a token.
**Do not write raw values in components.** They are rejected by ESLint and will
fail CI:

```tsx
// rejected
<div className="bg-[#fafaf9] p-[13px] text-stone-600" />

// accepted
<div className="bg-canvas px-section-x text-ink-muted" />
```

### Where things live

| File                 | Purpose                                                       |
| -------------------- | ------------------------------------------------------------- |
| `app/theme.css`      | The token source. Colours, type, spacing, radii, shadows.     |
| `app/site.config.ts` | Client identity: name, legal name, social links, privacy URL. |
| `tailwind.config.ts` | Maps token names to `var(--token)` for use as utilities.      |
| `app/globals.css`    | Reset, base typography, focus rings, overflow guards.         |

### The token names

Semantic, by role — never by colour. `text-ink-muted` survives a rebrand to a
navy palette; `text-stone-600` does not.

| Role     | Utilities                                                                    |
| -------- | ---------------------------------------------------------------------------- |
| Page bg  | `bg-canvas`                                                                  |
| Surfaces | `bg-surface`, `bg-surface-muted`, `bg-surface-inverse`                       |
| Borders  | `border-line` (decorative), `border-line-strong` (interactive, needs 3:1)    |
| Text     | `text-ink`, `text-ink-muted`, `text-ink-inverse`, `text-ink-inverse-muted`   |
| Action   | `bg-action`, `hover:bg-action-hover`, `text-action-text`, `bg-action-subtle` |
| Links    | `text-link`                                                                  |
| Brand    | `bg-brand-600` etc. — decorative use only; UI code uses semantic tokens      |

Type is `text-xs` … `text-5xl`, spacing is Tailwind's rem scale plus
`py-section-y md:py-section-y-lg` and `px-section-x md:px-section-x-lg`.

### Focus indicators on filled controls

Anything using `bg-action` **must** also carry `focus-ring-inset`.

The default ring is `--color-focus`, which is also `--color-action`. On an
amber button the ring measures 1:1 against the fill and is invisible.
`focus-ring-inset` draws the indicator inside the control in the label colour
instead (5.0:1). No single ring colour can contrast with both a dark fill and a
light page, so this is not optional for filled controls.

Inverted surfaces (the footer) already override `--color-focus` and need nothing
extra.

### Rebranding for a new client

Two files: `app/theme.css` for the visual tone, `app/site.config.ts` for names
and links. No component changes.

### Themes

Light is the default. `app/theme.css` also carries a `[data-theme="dark"]`
block, currently unused — set `data-theme="dark"` on `<html>` in
`app/layout.tsx` to enable it. Only semantic tokens are overridden there.

### Before opening a PR

- `npm run lint` — token enforcement
- `npm run format` — CI runs `format:check`
- Check the page at 360px, 768px, and 1280px for horizontal scroll
- Tab through every interactive element and confirm the focus ring is visible
- New tokens need a measured WCAG contrast ratio recorded beside them

## Deployment

The site is hosted on Vercel and deployed by [.github/workflows/deploy.yml](.github/workflows/deploy.yml) using the Vercel CLI.

- Push to `production` deploys to production.
- Push to `staging` creates a preview deployment; the URL is shown in the workflow run summary.

### Setup

1. Run `npx vercel link` locally and create the project. This writes `.vercel/project.json` (gitignored) containing `orgId` and `projectId`.
2. Create a token at vercel.com/account/tokens.
3. In GitHub, go to **Settings → Secrets and variables → Actions** and add `VERCEL_TOKEN`, `VERCEL_ORG_ID` (`orgId`) and `VERCEL_PROJECT_ID` (`projectId`).
