import { useParams } from "react-router-dom";
import { request, gql } from "graphql-request";
import { Data as StoreCatalog } from "../fetch/storeCatalog";
import { useEffect, useState } from "react";
import DepartmentCatalogItem from "./DeparmentCatalogItem";
import { Department } from "../fetch/departments";

export default function () {
  const { id } = useParams(),
    [fetch, fetchSet] = useState<StoreCatalog & { departments: Department }>();

  useEffect(() => {
    request(
      "http://localhost:3000/graphql",
      gql`
        {
          departments(id: ${id}) {
            name
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
    <div className="department-catalog">
      <h1>{JSON.stringify(fetch?.departments)}</h1>

      {fetch && <DepartmentCatalogItem storeCatalog={fetch.storeCatalog} />}
    </div>
  );
}
