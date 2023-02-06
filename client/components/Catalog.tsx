import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { graphQLClient } from "../graphql-client";
import { Query } from "../graphql-types";
import CatalogReview from "./CatalogReview";
import { useCartQuantity } from "./QuantityMenu";
import { SideDetails } from "./SideDetails";

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

export default function () {
  const { id } = useParams(),
    [query, querySet] = useState<Query>(),
    { QuantityMenu } = useCartQuantity();

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

          <SideDetails className="soft-shadow soft-border">
            <div className="catalog-brand">
              {query.catalog.Products.Brands.name}
            </div>
            <div className="catalog-title">{query.catalog.Products.name}</div>
            <div className="catalog-price">
              <b>${query.catalog.price}</b>
            </div>
            <div>
              <QuantityMenu catalog_id={query.catalog.id} />
            </div>
          </SideDetails>
        </Catalog>

        <hr />

        <CatalogReview query={query} />
      </Fragment>
    )
  );
}
