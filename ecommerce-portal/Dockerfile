# Use Node.js for Vue app
FROM node:18

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose frontend port
EXPOSE 8080

# Serve Vue app
CMD ["npm", "run", "serve"]
