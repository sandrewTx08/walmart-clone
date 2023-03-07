import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.OAUTH_GOOGLE_CLIENTID as string,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET as string,
    }),
  ],
});
