import { makeSchema } from "nexus";
import * as Types from "./types";
import Query from "./query";

const schema = makeSchema({
  types: [Types, Query],
  outputs: {
    schema: process.cwd() + "/models/schema.graphql",
  },
});

export default schema;