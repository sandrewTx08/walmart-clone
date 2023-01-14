FROM node:16
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build 
EXPOSE 4173
CMD npm run preview


FROM node:16
WORKDIR /app
COPY . .
RUN npm i
ENV DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}
RUN npx prisma generate
RUN npm test
EXPOSE 3000
CMD npm start
