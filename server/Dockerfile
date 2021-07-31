FROM node:14
WORKDIR /server
COPY ./src ./src
COPY .env .env
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
EXPOSE 3000:3000
ENTRYPOINT [ "npm", "run", "start"]
