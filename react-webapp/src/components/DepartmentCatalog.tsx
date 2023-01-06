import { useParams } from "react-router-dom";
import { request, gql } from "graphql-request";
import { Fragment, useEffect, useState } from "react";
import DepartmentCatalogItem from "./DeparmentCatalogItem";
import { Query } from "../graphql";

export default function () {
  const { id } = useParams(),
    [query, querySet] = useState<Query>();

  useEffect(() => {
    request(
      "http://localhost:3000/graphql",
      gql`
        {
          department(department_id: ${id}) {
            name
            _count
            catalog(limit: 30) {
              id
              price
              Products {
                name
                ProductRates {
                  rate
                }
              }
            }
          }
        }
      `
    ).then(querySet);
  }, [id]);

  return (
    <Fragment>
      {query && (
        <div className="department-catalog">
          <div>
            <h1>
              {query.department.name}
              <span>({query.department._count})</span>
            </h1>
            <div>Buy online now</div>
          </div>
          <hr />

          <div className="department-catalog-items">
            {<DepartmentCatalogItem query={query} />}
          </div>
        </div>
      )}
    </Fragment>
  );
}
