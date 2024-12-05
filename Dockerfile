# Base image for Node.js
FROM node:18 AS base

# Backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

# Frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Production image
FROM node:18-slim
WORKDIR /app

# Install bash and other dependencies
RUN apt-get update && apt-get install -y bash

# Copy backend files
COPY --from=base /app/backend /app/backend

# Copy frontend files
COPY --from=base /app/frontend/dist /app/frontend

# Expose ports
EXPOSE 3000 5000

# Install 'serve' globally to serve the frontend
RUN npm install -g serve

# Start both apps
CMD /bin/sh -c "node backend/server.js & exec serve -s frontend -l 3000"