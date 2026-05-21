FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY apps/backend ./apps/backend
COPY tsconfig.json .

EXPOSE 3000

CMD ["npm", "run", "--prefix", "apps/backend", "dev"]
