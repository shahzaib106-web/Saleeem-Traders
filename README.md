# Saleeem Traders

A production-ready monorepo scaffold for Saleeem Traders: a construction, sanitary, electrical, plumbing, hardware, paint, tile, lighting, and industrial supplies ecommerce platform.

## Apps

- `apps/storefront` - Customer-facing Next.js storefront.
- `apps/admin` - Admin dashboard for catalog, orders, content, marketing, analytics, and settings.
- `apps/api` - NestJS API scaffold with Prisma-ready modules.

## Getting started

```bash
pnpm install
pnpm dev:storefront
pnpm dev:admin
pnpm dev:api
```

Each app has its own README-ready folder structure so teams can build features independently.

## Deploying to Vercel

`next` lives in `apps/storefront`, not at the repo root — so a plain Vercel
import of the root fails to detect Next.js and deploys nothing.

Either set **Project → Settings → General → Root Directory** to
`apps/storefront` and leave every build setting at its default, **or** leave
Root Directory empty and rely on the committed root `vercel.json`, which pins
the framework, build command (`turbo run build --filter=@saleeem/storefront`)
and output directory (`apps/storefront/.next`).

No environment variables are required to build or run the storefront. Full
details, including the admin app and the API: [`docs/deployment.md`](docs/deployment.md).

Verify locally with the exact command Vercel runs:

```bash
pnpm install
turbo run build --filter=@saleeem/storefront --force
```
