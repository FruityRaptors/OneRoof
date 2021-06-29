# frontend

# Use the official lightweight Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:14

# Copy local code to the container image.
COPY . /app

# Create and change to the app directory.
WORKDIR /app

# ENV PORT 8080
# ENV HOST 0.0.0.0

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
# COPY package*.json /app/


# Install production dependencies.
RUN npm install 

#Build production app
RUN npm run build

# Expose $PORT on container.
# We use a varibale here as the port is something that can differ on the environment.
EXPOSE $PORT

# Set host to localhost / the docker image
ENV NUXT_HOST=0.0.0.0

# Set app port
ENV NUXT_PORT=$PORT

# Set the base url
ENV PROXY_API=$PROXY_API

# Set the browser base url
ENV PROXY_LOGIN=$PROXY_LOGIN



# #compile typescript to javascript
# RUN npm run build:server

# Run the web service on container startup.
CMD ["npm", "run", "serve"] 