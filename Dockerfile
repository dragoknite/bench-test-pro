# ---- Base Node ----
FROM node:18 AS build
WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Production ---
FROM node:18-slim
WORKDIR /usr/src/app/
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "./dist/server.js"]
