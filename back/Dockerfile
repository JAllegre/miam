FROM node:20-bookworm-slim as buildStage

WORKDIR /app

COPY ./ ./

RUN npm install

RUN npm run build

CMD ["node", "build/main.js"]
