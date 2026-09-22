# Deployment

## Vercel — storefront

This repository is a **pnpm + Turborepo monorepo**. `next` is a dependency of
`apps/storefront`, *not* of the repository root, which is the single most common
reason a Vercel import of this repo fails with errors like:

- `No Next.js version detected`
- `No Output Directory "dist" found`
- a deployment that builds "successfully" but serves nothing

Vercel pointed at the repo root looks for Next.js at the root, does not find it,
falls back to a generic build, and then cannot find any output to serve. Pin the
app explicitly — either of the two options below works. Pick **one**.

### Option A — Root Directory (Vercel's recommended monorepo path)

In the Vercel dashboard: **Project → Settings → General → Root Directory** →
`apps/storefront`.

Leave Framework Preset, Build Command, Output Directory and Install Command at
their defaults. Vercel detects the workspace from the root `pnpm-lock.yaml`,
installs it, and runs `next build` inside `apps/storefront`.

> When Root Directory is set, Vercel reads `vercel.json` **relative to that
> directory**, so the root `vercel.json` in this repo is ignored. That is
> intended: the framework defaults are already correct once the root directory
> points at the app. Do not add an `outputDirectory` to an app-level
> `vercel.json` — it makes Vercel treat the app as a static/Node output and
> breaks server rendering.

### Option B — root `vercel.json` (no dashboard changes)

The committed `vercel.json` at the repo root already does this:

```json
{
  "framework": "nextjs",
  "installCommand": "pnpm install",
  "buildCommand": "turbo run build --filter=@saleeem/storefront",
  "outputDirectory": "apps/storefront/.next"
}
```

Import the repository and leave **Root Directory empty**. `turbo` scopes the
build to the storefront only, and `.next/required-server-files.json` records
`relativeAppDir: apps/storefront`, which is how Vercel's Next.js builder finds
the app inside the nested output directory.

If the dashboard still shows stale values, check **Settings → General → Build &
Development Settings**: anything set there overrides the framework defaults, and
an Output Directory of `dist` or `.next` (root-relative) is what produces the
"nothing deployed" result.

### Verifying locally before pushing

```bash
pnpm install
turbo run build --filter=@saleeem/storefront --force   # exactly what Vercel runs
ls apps/storefront/.next/required-server-files.json    # must exist
```

### Environment

- Node `22.x` (declared in `engines`; Vercel honours it).
- pnpm `9.12.0` (declared in `packageManager`; Vercel uses it via Corepack).
- The storefront needs **no environment variables** to build or run. It renders
  from `src/data/catalog.ts`; `NEXT_PUBLIC_API_URL` is optional and defaults to
  `/api`.

## Vercel — admin dashboard (optional second project)

Create a separate Vercel project for `apps/admin` with **Root Directory**
`apps/admin`. Everything else default. Note that `apps/admin` currently has demo
data only and no real authentication — `src/middleware.ts` just redirects `/` to
`/dashboard`.

## API and database

`apps/api` (NestJS + Prisma) is **not** deployed by the Vercel config above; the
`--filter` deliberately excludes it. It needs a PostgreSQL database and a
generated Prisma client — see `docs/database.md` and
`infrastructure/deployment/`.

## Other targets

- `infrastructure/docker/` — Dockerfiles for the storefront, admin and API, plus
  a `docker-compose.yml`.
- `infrastructure/nginx/nginx.conf` — reverse proxy config for a VM deploy.
- `scripts/build.sh`, `scripts/deploy.sh` — helper scripts for VM deploys.
