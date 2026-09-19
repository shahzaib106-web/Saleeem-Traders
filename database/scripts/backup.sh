#!/usr/bin/env bash
set -euo pipefail
pg_dump "$DATABASE_URL" > "database/backups/saleeem-$(date +%Y%m%d%H%M%S).sql"
