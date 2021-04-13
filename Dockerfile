FROM node:15.11.0

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]