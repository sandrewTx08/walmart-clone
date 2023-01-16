import { GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient(
  "http://localhost:3000/graphql",
  {
    method: "POST",
  }
);
