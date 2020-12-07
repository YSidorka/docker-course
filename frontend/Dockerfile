# Use an existing docker image as a base
FROM node:14.14.0-alpine

WORKDIR /usr/ui

# Download and install a dependency
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx:alpine
EXPOSE 3000
COPY --from=0 ./usr/ui/build ./usr/share/nginx/html
COPY ./nginx/default.conf ./etc/nginx/conf.d/default.conf
