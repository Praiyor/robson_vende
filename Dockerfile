FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 9455

CMD ["npm", "run", "dev"]
