import { makeSchema } from "nexus";
import * as Types from "./types";
import * as Query from "./query";
import { join } from "path";

const schema = makeSchema({
  types: [Types, Query],
  outputs: { schema: join(__dirname, "schema.graphql") },
});

export default schema;
