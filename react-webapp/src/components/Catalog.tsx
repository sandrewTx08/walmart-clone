import request, { gql } from "graphql-request";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Query } from "../graphql";
import StartRate from "./Starrate";

export default function () {
  const { id } = useParams(),
    [query, querySet] = useState<Query>();

  useEffect(() => {
    request(
      "http://localhost:3000/graphql",
      gql`
       {
        catalog(catalog_id: ${id}) {
          id
          price
          Products {
            name
            ProductRates(limit: 6) {
              rate
              description
              _count
              User {
                first_name
              }
            }
            Brands {
              name
            }
          }
        }
       }
      `
    ).then(querySet);
  }, [id]);

  return (
    query && (
      <Fragment>
        <div className="catalog">
          <div>
            <img src="/walmartLogoSmall.png" />
          </div>

          <div className="catalog-details soft-shadow soft-border">
            <div className="catalog-brand">
              {query.catalog.Products.Brands.name}
            </div>
            <div className="catalog-title">{query.catalog.Products.name}</div>
            <div className="catalog-price">
              <b>${query.catalog.price}</b>
            </div>
          </div>
        </div>

        <hr />

        <div className="catalog-review">
          <h1>Customer reviews & ratings</h1>

          <div className="catalog-review-items">
            {query.catalog.Products.ProductRates.map((productRate) => (
              <div className="catalog-review-item soft-shadow soft-border">
                <div>
                  <div>
                    <b style={{ fontSize: "large" }}>
                      <StartRate rate={productRate.rate} />
                    </b>
                    /{productRate._count}
                  </div>
                </div>
                <div
                  className="catalog-review-item-title"
                  style={{ fontSize: "small" }}
                >
                  {productRate.description}
                </div>
                {productRate.User.first_name}
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    )
  );
}
