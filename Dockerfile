FROM node:18.12

# Create a working directory for the application
WORKDIR /app

# Copy the frontend directory and all of its contents to the working directory
COPY frontend .

# Install the dependencies
RUN npm install

# Set the port that the application will run on
EXPOSE 5173

# Start the application
CMD ["npm", "start"]