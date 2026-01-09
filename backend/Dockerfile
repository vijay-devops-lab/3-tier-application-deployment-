# syntax=docker/dockerfile:1
FROM node:20-slim

# Set environment
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copy source
COPY src ./src

# Expose API port
EXPOSE 5000

# Start server
CMD ["node", "src/server.js"]
