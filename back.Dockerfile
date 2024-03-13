FROM node:20-bookworm-slim as buildStage

WORKDIR /app

COPY ./front/src/types.ts ./front/src/types.ts

COPY ./back ./back

WORKDIR /app/back 

RUN npm install

RUN npm run build

CMD ["node", "build/back/main.js"]


