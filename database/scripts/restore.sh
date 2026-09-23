#!/usr/bin/env bash
set -euo pipefail
psql "$DATABASE_URL" < "$1"
