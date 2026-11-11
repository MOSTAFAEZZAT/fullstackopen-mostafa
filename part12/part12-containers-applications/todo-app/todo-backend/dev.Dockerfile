FROM node:20 AS development


WORKDIR /usr/src/app

COPY . .

RUN npm ci

EXPOSE 3000

CMD ["npm", "run" , "dev"]