FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start your application
CMD ["node", "index.js"]