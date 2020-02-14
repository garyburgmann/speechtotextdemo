FROM node:13-stretch-slim

WORKDIR /srv
COPY . /srv/

RUN npm i

CMD npx ng serve --host 0.0.0.0 --port 4200
