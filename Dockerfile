FROM node:16

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3333

CMD yarn run start api