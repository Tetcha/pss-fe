FROM node:16-alpine

WORKDIR /app
COPY . .

RUN yarn
RUN yarn run build

EXPOSE ${PORT}

CMD ["yarn", "run", "start"]
