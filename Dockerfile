FROM nginx:alpine AS base

# copy from dist to nginx root dir
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

FROM node:22-alpine AS builder
# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json .
RUN yarn

# build the angular app
COPY . .
RUN yarn build

FROM base AS final
# set author info
LABEL maintainer="WeihanLi"
# copy publish files
COPY --from=builder /app/dist/ReservationClient/browser /usr/share/nginx/html
