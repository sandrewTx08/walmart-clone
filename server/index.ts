import "dotenv/config";
import schema from "./graphql/schema";
import fastifyPassport from "@fastify/passport";
import fastifySecureSession from "@fastify/secure-session";
import fastifyCors from "@fastify/cors";
import mercurius from "mercurius";
import Fastify from "fastify";
import { Strategy as OAuth20GoogleStrategy } from "passport-google-oauth20";
import { Users } from "@prisma/client";
import prisma from "./prisma";
import { connect } from "mongoose";
import { randomUUID } from "crypto";

connect(process.env.MONGO_URL as string);

export const server = Fastify();
server.register(mercurius, { schema });
server.register(fastifyCors);
// @ts-ignore
server.register(fastifySecureSession, {
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

  if (sessionUser.id) {
    return prisma.users
      .findUnique({ where: { id: sessionUser.id } })
      .then((user) => {
        if (user) {
          return { ...user, auth: true };
        } else {
          const data: Users = Object();
          data.id = sessionUser.id;
          data.first_name = sessionUser.name.givenName;
          data.last_name = sessionUser.name.familyName;
          data.email = sessionUser.emails[0].value;
          data.avatar = sessionUser.photos[0].value;
          return prisma.users
            .create({ data })
            .then((newUser) => ({ ...newUser, auth: true }));
        }
      });
  } else {
    const user_id = req.session.get("user_id");

    if (user_id) {
      return { id: user_id, auth: false };
    } else {
      const uuid = randomUUID();
      req.session.set("user_id", uuid);
      return { id: uuid, auth: false };
    }
  }
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
server.delete("/logout", (req) => {
  const logout = { success: req.user ? true : false };
  return req.logout().then(() => logout);
});
server.listen({ port: 3000, host: "0.0.0.0" });
