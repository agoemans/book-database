FROM node:14
WORKDIR /client
COPY ./src ./src
COPY ./templates ./templates
COPY .babelrc .babelrc
COPY package*.json ./
COPY tsconfig*.json ./
COPY webpack.config.js ./
RUN npm install
EXPOSE 8080:8080
ENTRYPOINT [ "npm", "run", "start"]
