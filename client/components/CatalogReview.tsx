import styled from "styled-components";
import { Query } from "../graphql-types";
import StartRate from "./StarRate";

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

export default function (props: { query: Query }) {
  return (
    <CatalogReview>
      <h1>Customer reviews & ratings</h1>

      {props.query.catalog.Products.ProductRates.map((productRate, index) => (
        <div className="soft-shadow soft-border" key={index}>
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
  );
}
