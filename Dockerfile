FROM nginx:alpine AS base

# copy from dist to nginx root dir
COPY ./conf/nginx.default.conf /etc/nginx/conf.d/default.conf

FROM node:12-alpine AS builder
# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json .
RUN npm install

# build the angular app
COPY . .
RUN npm run build

FROM base AS Final
# expose port 80
EXPOSE 80
# set author info
LABEL maintainer="WeihanLi"
# copy publish files
COPY --from=builder /app/dist/ReservationClient /usr/share/nginx/html
# run nginx in foreground
# https://stackoverflow.com/questions/18861300/how-to-run-nginx-within-a-docker-container-without-halting
CMD ["nginx", "-g", "daemon off;"]
