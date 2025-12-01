# Use Node 25 LTS image
FROM node:25-bullseye-slim

# Set working directory
WORKDIR /app

# Install system dependencies (if needed for Prisma/Postgres)
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    ca-certificates \
    libpq-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install PNPM globally
RUN npm install -g pnpm@10.10.0

# Copy package.json and pnpm-lock.yaml first to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the project
COPY . .

# Expose your API port
EXPOSE 3000

# Build the project
RUN pnpm run build

# Use production environment
ENV NODE_ENV=production

# Start the app
CMD ["node", "dist/main.js"]
