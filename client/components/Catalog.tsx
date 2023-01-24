import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { graphQLClient } from "../graphql-client";
import { Query } from "../graphql-types";
import StartRate from "./StarRate";

const CatalogDetails = styled.div`
  padding: 1em;
  width: 40%;
  word-break: break-all;
  max-height: 400px;
  min-width: 300px;
  z-index: 100;
  background-color: white;

  div {
    padding: 5px;
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    width: 50%;
  }
`;

const Catalog = styled.div`
  display: flex;

  img {
    width: 100%;
    max-width: 100%;
  }

  .catalog-price {
    font-size: x-large;
  }

  .catalog-title {
    font-size: large;
  }
`;

const CatalogReview = styled.div`
  h1 {
    font-size: x-large;
    padding: 1em;
  }

  div {
    margin: 8px;
    padding: 1em;
    display: inline-block;
  }
`;

export default function () {
  const { id } = useParams(),
    [query, querySet] = useState<Query>();

  useEffect(() => {
    graphQLClient
      .request(
        `{
          catalog(catalog_id: ${id}) {
            id
            price
            Products {
              name
              ProductRates(limit: 6) {
                rate
                description
                _count
                Users {
                  first_name
                }
              }
              Brands {
                name
              }
            }
          }
        }`
      )
      .then(querySet);
  }, [id]);

  useEffect(() => {
    if (query) {
      document.title = `${query.catalog.Products.name} - Walmart.com`;
    }
  }, [query]);

  return (
    query && (
      <Fragment>
        <Catalog>
          <img src="/walmartLogoSmall.png" />

          <CatalogDetails className="soft-shadow soft-border">
            <div className="catalog-brand">
              {query.catalog.Products.Brands.name}
            </div>
            <div className="catalog-title">{query.catalog.Products.name}</div>
            <div className="catalog-price">
              <b>${query.catalog.price}</b>
            </div>
          </CatalogDetails>
        </Catalog>

        <hr />

        <CatalogReview>
          <h1>Customer reviews & ratings</h1>

          {query.catalog.Products.ProductRates.map((productRate) => (
            <div className="soft-shadow soft-border">
              <div>
                <b>
                  <StartRate rate={productRate.rate} />
                </b>
                /{productRate._count}
              </div>

              <div style={{ fontSize: "small" }}>{productRate.description}</div>
              {productRate.Users.first_name}
            </div>
          ))}
        </CatalogReview>
      </Fragment>
    )
  );
}
