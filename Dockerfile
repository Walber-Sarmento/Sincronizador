FROM node:13-alpine3.10
WORKDIR /app
COPY . ./
RUN yarn install --prod
RUN apk add curl
EXPOSE 3000
ENTRYPOINT ["node", "index.js"]
HEALTHCHECK --retries=1 --timeout=15s --start-period=65s --interval=5s CMD curl --silent --fail http://127.0.0.1