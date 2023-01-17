FROM node:16
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn prisma generate
RUN yarn build
EXPOSE 4000
CMD yarn start
