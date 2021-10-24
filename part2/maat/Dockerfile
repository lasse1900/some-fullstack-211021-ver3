# Basic Dockerfile size 809 MB

# pull official base image
# FROM node:13.12.0-alpine

# # set working directory
# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install app dependencies
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent

# # copy to app
# COPY . ./

# # start app
# CMD ["npm", "start"]

# Optimized Dockerfile size 373 MB

# pull official base image
FROM node:13.12.0-alpine as build-stage

# set working directory
WORKDIR /usr/app
COPY . .
RUN npm install && \
  npm run build && \
  npm install react-scripts@3.4.1 -g

FROM node:13.12.0-alpine
COPY --from=build-stage /usr/app /usr/app
WORKDIR /usr/app
COPY package.json ./
COPY package-lock.json ./

CMD ["npm", "start"]