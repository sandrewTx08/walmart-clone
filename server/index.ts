import schema from "./graphql/schema";
import Fastify from "fastify";

export const server = Fastify();
server.register(require("@fastify/cors"));
server.register(require("mercurius"), { schema });
server.listen({
  port: (process.env.PORT as unknown as number) || 3000,
  host: "0.0.0.0",
});
