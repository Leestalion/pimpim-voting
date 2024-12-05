# Base image for Node.js
FROM node:18 AS base

# Set environment variables for both backend and frontend
ENV NODE_ENV=production

# Backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN npm run build

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

# Copy backend built files
COPY --from=base /app/backend/dist /app/backend/dist
COPY --from=base /app/backend/package*.json /app/backend/ 

# Copy frontend built files
COPY --from=base /app/frontend/dist /app/frontend/dist

# Expose ports
EXPOSE 3000 5000

# Install 'serve' globally to serve the frontend
RUN npm install -g serve

# Start both apps
CMD /bin/sh -c "node backend/dist/server.js & exec serve -s frontend -l 3000"