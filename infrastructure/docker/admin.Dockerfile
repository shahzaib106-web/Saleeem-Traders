FROM node:22-alpine
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install --frozen-lockfile=false && pnpm --filter @saleeem/admin build
CMD ["pnpm", "--filter", "@saleeem/admin", "start"]
