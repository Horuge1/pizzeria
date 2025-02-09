FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:20-alpine

WORKDIR /usr/src/app

ARG NODE_ENV=porduction
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /usr/src/app/dist ./dist

COPY package.json package-lock.json ./

RUN npm install --prod

RUN rm package.json package-lock.json

EXPOSE 3000

CMD [ "node","dist/main.js" ]
