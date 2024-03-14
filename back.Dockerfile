FROM node:20-bookworm-slim as buildStage

WORKDIR /app

COPY ./common/ ./common

COPY ./back ./back

WORKDIR /app/back 

RUN npm install

RUN npm run build

CMD ["node", "build/back/src/main.js"]


