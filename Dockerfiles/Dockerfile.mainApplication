#  Dockerfile for NodeJS service
FROM node:16-alpine

RUN mkdir -p /usr/web/mainApplication
WORKDIR /usr/web/mainApplication

COPY ./nodejsService/package*.json $WORKDIR
RUN npm install

COPY ./nodejsService $WORKDIR

EXPOSE 8000

CMD ["npm", "run", "start"]