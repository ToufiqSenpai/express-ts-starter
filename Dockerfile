FROM node:latest

WORKDIR /app

COPY dist/* .
COPY package.json .

RUN npm install

EXPOSE 8080

CMD [ "node", "main.js" ]