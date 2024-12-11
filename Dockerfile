# Base image for building frontend
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend ./
RUN npm run build

# Base image for building backend
FROM node:20-slim AS backend-build
WORKDIR /app/backend
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install
COPY ./backend ./
RUN npm run build

# Final image
FROM node:20-slim
WORKDIR /app

# Copy backend and frontend dist folders
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist
COPY --from=backend-build /app/backend/dist /app/backend/dist

COPY ./backend/src/knexfile.ts ./
COPY ./backend/migrations ./migrations/
COPY ./backend/run-migrations.sh ./

# Install dependencies for database migration
RUN npm install dotenv pg knex
# Install dependencies for serving frontend
RUN npm install -g serve ts-node

# Expose ports
EXPOSE 3000 5000

# Command to run backend and frontend
CMD /bin/sh -c "node backend/dist/server.js & exec serve -s frontend/dist -l 3000"