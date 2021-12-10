FROM nginx:alpine AS base

# copy from dist to nginx root dir
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

FROM node:16-alpine AS builder
# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json .
RUN npm install

# build the angular app
COPY . .
RUN npm run build

FROM base AS Final
# set author info
LABEL maintainer="WeihanLi"
# copy publish files
COPY --from=builder /app/dist/ReservationClient /usr/share/nginx/html
