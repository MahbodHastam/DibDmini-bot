FROM node:15.11.0

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

RUN bash run.sh

CMD ["npm", "run", "dev"]