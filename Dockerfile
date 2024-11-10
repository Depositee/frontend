FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if using Yarn)
COPY package*.json ./

# Install dependencies, using --legacy-peer-deps if necessary
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Set the environment variable for Next.js to run in production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
