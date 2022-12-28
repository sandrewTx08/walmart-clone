// @ts-check

const server = require("./server");
const { describe, it, expect } = require("@jest/globals");
const inject = require("light-my-request");

/**
 *
 * @param {string} query
 * @param {(res: inject.Response) => void} callback
 */
function testGraphqlServer(query, callback) {
  return server
    .inject()
    .headers({ "content-type": "application/json" })
    .post("/graphql")
    .body({ query })
    .then(callback);
}

describe("graphql", () => {
  /**
   * @type {string}
   */
  let query;

  it("storeCatalog", (done) => {
    query = `{
      storeCatalog(limit: 1, store_id: 1) {
        price
        Products {
          name
          id
          ProductTypes {
            name
            id
          }
        }
      }
    }`;

    testGraphqlServer(query, (res) => {
      expect(JSON.parse(res.body)).toHaveProperty("data.storeCatalog");
      done();
    });
  });

  it("departments", (done) => {
    query = `{
      departments {
        name
      }
    }`;

    testGraphqlServer(query, (res) => {
      expect(JSON.parse(res.body)).toHaveProperty("data.departments");
      done();
    });
  });
});
