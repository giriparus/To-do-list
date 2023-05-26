# syntax=docker/dockerfile:1

FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /home/parus/Intern-project/To-do-list

COPY ["package.json", "./"]

RUN npm install --production

COPY . .

CMD ["node", "server.js"]