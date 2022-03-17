FROM node:17-slim

RUN apt update && \
    apt install sox libsox-fmt-mp3 -y

WORKDIR /spotify-radio/

COPY package*.json /spotify-radio/

RUN npm ci --silent

COPY . .

USER node

CMD ["npm", "run", "live-reload"]