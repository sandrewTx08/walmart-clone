// @ts-check

import { useParams } from "react-router-dom";
import { request, gql } from "graphql-request";
import React from "react";

export default function () {
  const { id } = useParams(),
    [fetch, fetchSet] = React.useState(() => {
      /**
       * @type {import('../fetch/storeCatalog').Data=}
       */
      let initialState;
      return initialState;
    });

  React.useEffect(() => {
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
    <React.Fragment>
      <div className="department-catalog">
        {fetch &&
          fetch.storeCatalog.map((catalog) => (
            <div className="department-catalog-item">
              <img src="/walmartLogoSmall.png" />
              <ul>
                <li>
                  <div className="department-catalog-price">
                    <b>${catalog.price}</b>
                  </div>
                  <div className="department-catalog-title">
                    {catalog.Products.name}
                  </div>
                  <div className="department-catalog-rate">
                    {catalog.Products.ProductRates.reduce(
                      (pv, ac) => pv + ac.rate,
                      0
                    ) / catalog.Products.ProductRates.length}
                  </div>
                </li>
              </ul>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
}
