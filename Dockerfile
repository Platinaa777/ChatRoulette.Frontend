# Use an official Node.js runtime as the base image
FROM node:21-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the entire Next.js application to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that your Next.js app will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]