#!/usr/bin/env bash
set -euo pipefail
pnpm --filter @saleeem/api prisma db seed
