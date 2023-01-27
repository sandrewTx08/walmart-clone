import { makeSchema } from "nexus";
import { join } from "path";
import * as Type from "./type";
import * as Mutation from "./mutation";
import * as Enum from "./enum";
import * as Query from "./query";

const schema = makeSchema({
  types: [Type, Query, Mutation, Enum],
  outputs: { schema: join(__dirname, "schema.graphql") },
});

export default schema;
