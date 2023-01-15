FROM node:16
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn prisma generate
RUN yarn build
RUN yarn start
EXPOSE 4173
CMD yarn start
