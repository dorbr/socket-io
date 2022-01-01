FROM node:16

WORKDIR /usr/src/app

COPY server/package.json ./server/

RUN cd server && npm install

COPY server/ ./server

COPY client/build/ ./client/build

WORKDIR /usr/src/app/server

CMD ["npm", "start"]