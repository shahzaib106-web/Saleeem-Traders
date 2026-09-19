FROM node:22-alpine
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install --frozen-lockfile=false && pnpm --filter @saleeem/api build
CMD ["pnpm", "--filter", "@saleeem/api", "start"]
