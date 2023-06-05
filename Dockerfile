# syntax=docker/dockerfile:1

FROM node:18-alpine

ENV NODE_ENV=production

# Install required packages for MongoDB
RUN apk add --no-cache mongodb-tools

EXPOSE 8089 

WORKDIR /home/parus/Intern-project/To-do-list

COPY ["package.json", "./"]

RUN npm install --production

COPY . .

CMD ["node", "server.js"]
