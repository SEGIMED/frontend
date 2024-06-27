# Stage 1: Base Development Image
FROM node:18-alpine AS development
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Stage 2: Install Dependencies
FROM node:18-alpine AS dependencies
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production

# Stage 3: Build Applicationa
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 4: Production Image
FROM node:18-alpine AS production
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package-lock.json /app/package.json ./
COPY --from=dependencies /app/node_modules ./node_modules
USER node
EXPOSE 3000
CMD ["npm", "start"]