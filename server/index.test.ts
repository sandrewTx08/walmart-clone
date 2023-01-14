import { server } from ".";
import { CallbackFunc } from "light-my-request";

function testGraphqlServer(query: string, callback: CallbackFunc) {
  return server
    .inject()
    .headers({ "content-type": "application/json" })
    .post("/graphql")
    .body({ query })
    .end(callback);
}

describe("graphql", () => {
  let query: string;

  it("storeCatalog", (done) => {
    query = `{
      storeCatalog(limit: 1, store_id: 1, department_id: 1) {
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

    testGraphqlServer(query, (err, res) => {
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

    testGraphqlServer(query, (err, res) => {
      expect(JSON.parse(res.body)).toHaveProperty("data.departments");
      done();
    });
  });
});
