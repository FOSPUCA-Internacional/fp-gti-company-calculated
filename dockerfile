# Base image
FROM node:20-bookworm-slim

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Copy the .env and .env.development files
COPY .env ./

# Creates a "dist" folder with the production build
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y tzdata vim

RUN apt install openssl -y

# Configura la zona horaria
ENV TZ=America/Caracas  
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm run build



# Expose the port on which the app will run
EXPOSE 4008

# Start the server using the production build
CMD ["npm", "run", "start:prod"]