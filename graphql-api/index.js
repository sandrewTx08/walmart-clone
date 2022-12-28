const fastify = require("./src/server.js");

fastify.listen({
  port: process.env.PORT || 3000,
  host: "0.0.0.0",
});
