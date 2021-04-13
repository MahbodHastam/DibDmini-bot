FROM node:alpine

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]