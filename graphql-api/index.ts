import fastify from "./src/server";

fastify.listen({
  port: (process.env.PORT as unknown as number) || 3000,
  host: "0.0.0.0",
});
