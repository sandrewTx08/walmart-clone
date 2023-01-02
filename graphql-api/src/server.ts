import schema from "./graphql/schema";
import Fastify from "fastify";

const fastify = Fastify();
fastify.register(require("mercurius"), { schema });
fastify.register(require("@fastify/cors"));

export default fastify;
