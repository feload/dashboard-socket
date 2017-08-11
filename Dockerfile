FROM node:boron
MAINTAINER Felipe <feload@gmail.com>

WORKDIR /usr/src/app
ARG port=8181

COPY app .

RUN npm install

ENV port=$port
EXPOSE $port

CMD [ "npm", "start" ]
