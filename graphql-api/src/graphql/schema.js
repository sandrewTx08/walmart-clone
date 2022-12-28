// @ts-check

const nexus = require("nexus");
const Types = require("./types.js");
const Query = require("./query.js");

const schema = nexus.makeSchema({
  types: [Types, Query],
  outputs: {
    schema: process.cwd() + "/models/schema.graphql",
  },
});

module.exports = schema;
