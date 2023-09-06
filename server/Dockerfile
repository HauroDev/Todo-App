FROM node:18.17.1

WORKDIR /usr/src/app/todo-app-server

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 4001
CMD [ "npm","run","dev" ]