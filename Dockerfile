# ─── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite React build  →  dist/
# TypeScript server →  dist-server/
RUN npm run build && npm run build:server


# ─── Stage 2: Production ─────────────────────────────────────────────────────
FROM node:24-alpine AS production

WORKDIR /app

# Production deps only
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Compiled server
COPY --from=builder /app/dist-server ./dist-server

# Vite React build
COPY --from=builder /app/dist ./dist

# Asset folders (also mounted as volumes in docker-compose for live updates)
COPY --from=builder /app/src/assets/Certificate ./src/assets/Certificate
COPY --from=builder /app/src/assets/AppLogos    ./src/assets/AppLogos

# Optional files — COPY with wildcard so missing files don't fail the build
COPY --from=builder /app/policies.jso[n]  ./
COPY --from=builder /app/template[s]      ./templates/

# Non-root user
RUN addgroup -S ramiz && adduser -S ramiz -G ramiz
USER ramiz

ENV NODE_ENV=production \
    PORT=8004

EXPOSE 8004

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:8004/health || exit 1

CMD ["node", "dist-server/server.js"]