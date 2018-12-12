FROM node:10.14.0-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -qy

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
