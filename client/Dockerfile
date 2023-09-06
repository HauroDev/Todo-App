FROM node:18.17.1

WORKDIR /usr/src/app/todo-app-client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
