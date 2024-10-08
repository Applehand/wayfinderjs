# Base image with Node.js
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install all dependencies (both development and production)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 8081

# Set environment variables (optional, modify as needed)
ENV NODE_ENV=development

# Command to run the development server
CMD ["npm", "run", "dev"]
