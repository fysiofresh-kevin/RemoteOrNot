# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy entrypoint script and set permissions
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Create a non-root user and change ownership of the application files
RUN useradd -m appuser && chown -R appuser:appuser /usr/src/app

# Switch to non-root user
USER appuser

# Expose the port the app runs on
EXPOSE 3000

# Define the entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# Define the command to run the app
CMD ["npm", "start"]
