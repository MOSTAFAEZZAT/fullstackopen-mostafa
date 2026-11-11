FROM node:20-alpine AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run test

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
