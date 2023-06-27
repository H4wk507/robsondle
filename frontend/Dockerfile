FROM node:latest AS build
WORKDIR /build

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY index.html index.html
COPY vite.config.ts vite.config.ts
COPY public/ public
COPY src/ src
RUN npm install
RUN npm --global install serve
RUN npm run docker_build

WORKDIR /build
CMD ["serve", "-s", "dist", "-p", "5173"]
