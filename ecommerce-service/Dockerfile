# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Install system dependencies for bcrypt
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Rebuild bcrypt specifically for the container's OS
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the app
COPY . .

# Expose API port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
