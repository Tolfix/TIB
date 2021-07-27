FROM node:14-alpine

LABEL author="Tolfix" maintainer="support@tolfix.com"

RUN npm install -g @types/node \
    && npm install -g typescript

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . ./

RUN tsc -b

ENV DISCORD_TOKEN ""
ENV DISCORD_CLIENT_ID ""
ENV DISCORD_CLIENT_SECRET ""
ENV PREFIX ""

ENV DB_MONGO_URI ""

ENV EXPRESS_PORT ""
ENV EXPRESS_SESSION_SECRET ""

ENV FQDN ""
ENV HTTP ""

EXPOSE 8080

CMD [ "node", "./build/Main.js" ]