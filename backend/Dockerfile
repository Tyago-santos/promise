FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10 --activate

# ---- deps ----
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- build ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm prisma generate
RUN pnpm build

# ---- production ----
FROM base AS production
ENV NODE_ENV=production

# pnpm usa symlinks para o node_modules content-addressable store, então é mais
# simples/confiável reaproveitar o node_modules do build (já com o client do
# Prisma gerado) do que tentar recriar só a parte de produção.
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

EXPOSE 3333
CMD ["sh", "-c", "pnpm exec prisma migrate deploy && node dist/server.js"]
