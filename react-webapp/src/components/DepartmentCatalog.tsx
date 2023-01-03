import { useParams } from "react-router-dom";
import { request, gql } from "graphql-request";
import { Data as StoreCatalog } from "../fetch/storeCatalog";
import { Fragment, useEffect, useState } from "react";
import DepartmentCatalogItem from "./DeparmentCatalogItem";
import { Department } from "../fetch/departments";

export default function () {
  const { id } = useParams(),
    [fetch, fetchSet] = useState<
      StoreCatalog & { departments: Department[] }
    >();

  useEffect(() => {
    request(
      "http://localhost:3000/graphql",
      gql`
        {
          departments(id: ${id}) {
            name
            _count
          }
          storeCatalog(limit: 30, department_id: ${id}, store_id: 1) {
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
      `
    ).then(fetchSet);
  }, [id]);

  return (
    <Fragment>
      {fetch && (
        <div className="department-catalog">
          <div>
            <h1>
              {fetch.departments[0].name}
              <span>({fetch.departments[0]._count})</span>
            </h1>
            <div>Buy online now</div>
          </div>
          <hr />

          <div className="department-catalog-items">
            {<DepartmentCatalogItem storeCatalog={fetch.storeCatalog} />}
          </div>
        </div>
      )}
    </Fragment>
  );
}
