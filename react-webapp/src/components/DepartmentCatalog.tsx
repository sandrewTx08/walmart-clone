import { useParams } from "react-router-dom";
import { request, gql } from "graphql-request";
import { Data as StoreCatalog } from "../fetch/storeCatalog";
import { Fragment, useEffect, useState } from "react";
import DepartmentCatalogItem from "./DeparmentCatalogItem";

export default function () {
  const { id } = useParams(),
    [fetch, fetchSet] = useState<StoreCatalog>();

  useEffect(() => {
    request(
      "http://localhost:3000/graphql",
      gql`
        {
          storeCatalog(limit: 50, department_id: ${id}, store_id: 1) {
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
      <div className="department-catalog">
        {fetch && <DepartmentCatalogItem storeCatalog={fetch.storeCatalog} />}
      </div>
    </Fragment>
  );
}
