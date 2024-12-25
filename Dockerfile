# Use a base image that includes Node.js
FROM node:16

# Set the working directory for your app
WORKDIR /home/upadhyayastha512/qp-assessment-qp-assessment

# Copy the ZIP file into the container
COPY qp-assessment-qp-assessment.zip /home/upadhyayastha512/

# Install unzip utility (if not already included in the base image)
RUN apt-get update && apt-get install -y unzip

# Create the directory and extract the ZIP file there
RUN unzip /home/upadhyayastha512/qp-assessment-qp-assessment.zip -d /home/upadhyayastha512/ && \
    rm /home/upadhyayastha512/qp-assessment-qp-assessment.zip

# Set the working directory to the extracted folder inside the ZIP file
WORKDIR /home/upadhyayastha512/qp-assessment-qp-assessment/qp-assessment-qp-assessment

# Install dependencies
RUN npm install

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]
docker push gcr.io/project-2-f0fb3/my-app:v1
