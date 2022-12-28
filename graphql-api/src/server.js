const schema = require("./graphql/schema.js");
const fastify = require("fastify").default();

fastify.register(require("mercurius"), { schema });
fastify.register(require("@fastify/cors"));

module.exports = fastify;
