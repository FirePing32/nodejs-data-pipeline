#  Dockerfile for Message service
FROM node:16-alpine

RUN mkdir -p /usr/web/messageService
WORKDIR /usr/web/messageService

COPY ./messageService/package*.json $WORKDIR

RUN npm install

COPY ./messageService $WORKDIR

EXPOSE 9002

CMD ["npm", "run", "start"]