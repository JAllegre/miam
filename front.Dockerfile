FROM node:20-bookworm-slim as buildStage

WORKDIR /app

COPY ./front ./

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=buildStage /app/dist /usr/share/nginx/html

COPY ./front/nginx.default.conf /etc/nginx/conf.d/default.conf
