# syntax=docker/dockerfile:1

# ── Estágio 1: dependências ──────────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ── Estágio 2: imagem final ───────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

# Usuário não-root (boas práticas de segurança)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copia apenas o necessário do estágio anterior
COPY --from=deps --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --chown=appuser:appgroup src/ ./src
COPY --chown=appuser:appgroup package.json ./

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "src/index.js"]
