FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM node:18-alpine AS deploy-node
WORKDIR /app
RUN rm -rf ./*
COPY --from=builder /app/package.json .
COPY --from=builder /app/build .
RUN npm install --production
ENV ORIGIN="http://localhost:3000"
CMD ["node", "index.js"]
