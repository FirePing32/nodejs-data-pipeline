#  Dockerfile for Sheets Service
FROM node:16-alpine

RUN mkdir -p /usr/web/sheetsService
WORKDIR /usr/web/sheetsService

COPY ./sheetsService/package*.json $WORKDIR

RUN npm install

COPY ./sheetsService $WORKDIR

EXPOSE 9001

CMD ["npm", "run", "start"]