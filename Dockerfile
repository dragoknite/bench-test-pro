# ---- Base Node ----
FROM node:18 AS base
WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Production ---
#FROM node:18-slim
FROM base as production
WORKDIR /usr/src/app/
COPY --from=base /usr/src/app/dist ./dist
COPY package*.json ./
#RUN npm ci --only=production
RUN npm run build
EXPOSE 3000
CMD ["node", "./dist/server.js"]
