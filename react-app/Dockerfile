FROM node:latest

WORKDIR /workdir
COPY ./package.json /workdir/package.json
COPY ./package-lock.json /workdir/package-lock.json
RUN npm ci

COPY . /workdir/

RUN npm ci
RUN npm run build
