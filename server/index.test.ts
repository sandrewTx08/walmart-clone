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

  afterAll((done) => {
    server.close(done);
  });

  it("storeCatalog", (done) => {
    query = `{
      department(department_id:2) {
          name
          _count
          catalog(limit: 10, store_id:3) {
              id
              Products {
              ProductRates {
              rate
            }
          }
        }
      }
    }`;

    testGraphqlServer(query, (err, res) => {
      expect(JSON.parse(res.body)).toHaveProperty("data.department");
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
