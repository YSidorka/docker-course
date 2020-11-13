# Use an existing docker image as a base
FROM node:alpine

WORKDIR /usr/app

# Download and install a dependency
COPY ./package.json ./
RUN npm install

COPY ./ ./
RUN npm run build

FROM nginx:alpine
COPY --from=0 ./usr/app/build ./usr/share/nginx/html
