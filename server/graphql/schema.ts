import { makeSchema } from "nexus";
import * as Types from "./types";
import * as Query from "./query";

const schema = makeSchema({
  types: [Types, Query],
});

export default schema;
