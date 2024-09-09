FROM node:22-alpine3.19 AS payment

# Required to run Prisma on ARM64 machines
# https://github.com/prisma/prisma/issues/861#issuecomment-881992292
RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

COPY ./dist/apps/payment/package*.json ./

RUN npm i --omit=dev

COPY ./dist/apps/payment .


ENV PORT=3002
EXPOSE $PORT

ENTRYPOINT ["node", "./main.js"]