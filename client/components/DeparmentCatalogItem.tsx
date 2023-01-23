import { Fragment, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Query } from "../graphql-types";
import StarRate from "./StarRate";

const DepartmentCatalogItem = styled.div`
  display: inline-block;
  width: 23%;
  padding: 0 1%;

  div {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    width: 100%;
    max-width: 100%;
    display: block;
  }
`;

export default function (props: PropsWithChildren<{ query: Query }>) {
  return (
    <Fragment>
      {props.query.department.catalog.map((catalog) => (
        <Link to={"catalog/" + catalog.id}>
          <DepartmentCatalogItem>
            <img src="/walmartLogoSmall.png" />
            <div>
              <b>${catalog.price}</b>
            </div>
            <div>{catalog.Products.name}</div>
            <div>
              <StarRate
                rate={(
                  catalog.Products.ProductRates.reduce(
                    (p, a) => p + Number(a.rate),
                    0
                  ) /
                  catalog.Products.ProductRates.find(
                    (p) => p.product_id == catalog.product_id
                  )?._count
                ).toString()}
              />
              {
                catalog.Products.ProductRates.find(
                  (p) => p.product_id == catalog.product_id
                )?._count
              }
            </div>
          </DepartmentCatalogItem>
        </Link>
      ))}
    </Fragment>
  );
}
