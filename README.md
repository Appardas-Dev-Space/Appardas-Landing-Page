# Main-Landing-Page

Main Landing page of Appardas, It introduces the company, products, and the members

## Deployment

The site is hosted on Vercel and deployed by [.github/workflows/deploy.yml](.github/workflows/deploy.yml) using the Vercel CLI.

- Push to `production` deploys to production.
- Push to `staging` creates a preview deployment; the URL is shown in the workflow run summary.

### Setup

1. Run `npx vercel link` locally and create the project. This writes `.vercel/project.json` (gitignored) containing `orgId` and `projectId`.
2. Create a token at vercel.com/account/tokens.
3. In GitHub, go to **Settings → Secrets and variables → Actions** and add `VERCEL_TOKEN`, `VERCEL_ORG_ID` (`orgId`) and `VERCEL_PROJECT_ID` (`projectId`).
