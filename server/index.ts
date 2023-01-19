import "dotenv/config";
import schema from "./graphql/schema";
import fastifyPassport from "@fastify/passport";
import Fastify from "fastify";
import { Strategy as OAuth20GoogleStrategy } from "passport-google-oauth20";
import { Users } from "@prisma/client";
import prisma from "./prisma";

export const server = Fastify();
server.register(require("mercurius"), { schema });
server.register(require("@fastify/cors"));
server.register(require("@fastify/secure-session"), {
  secret: process.env.SESSION_SECRET,
  salt: process.env.SESSION_SALT,
  cookie: { path: "/" },
});
server.register(fastifyPassport.initialize());
server.register(fastifyPassport.secureSession());
fastifyPassport.use(
  "google",
  new OAuth20GoogleStrategy(
    {
      clientID: process.env.OAUTH_GOOGLE_CLIENTID as string,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET as string,
      callbackURL: "http://localhost:3000/oauth/google",
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ],
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);
fastifyPassport.registerUserDeserializer<Users, unknown>(async (user) => user);
fastifyPassport.registerUserSerializer<Users, unknown>(async (user) => user);
server.get("/user", (req) => {
  const sessionUser = Object(req.user);

  return prisma.users
    .findUnique({ where: { id: sessionUser.id } })
    .then((user) => {
      if (user) {
        return user;
      } else {
        const data: Users = Object();
        data.id = sessionUser.id;
        data.first_name = sessionUser.name.familyName;
        data.last_name = sessionUser.name.givenName;
        data.email = sessionUser.emails[0].value;
        data.avatar = sessionUser.photos[0].value;
        return prisma.users.create({ data });
      }
    });
});
server.get(
  "/oauth/google",
  {
    preValidation: fastifyPassport.authenticate("google", {
      failureRedirect: "http://localhost:4000/error/auth",
      successRedirect: "http://localhost:4000/",
    }),
  },
  (req) => req.user
);
server.get("/login", fastifyPassport.authenticate("google"));
server.get("/logout", (req) => {
  const logout = { success: req.user ? true : false };
  return req.logout().then(() => logout);
});
server.listen({ port: 3000, host: "0.0.0.0" });
