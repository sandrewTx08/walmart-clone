import { Link } from "react-router-dom";
import { Query } from "../graphql-types";
import styled from "styled-components";
import StarRate from "./StarRate";
import { Fragment } from "react";
import { RiAddLine, RiSubtractFill } from "react-icons/ri";
import { AddCartButton, QuantityMenu, useCartQuantity } from "./QuantityMenu";

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

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  justify-items: center;
  margin-bottom: 7px;

  div {
    margin: auto 0;
    font-size: large;
  }
`;

export default function (props: React.PropsWithChildren<{ query: Query }>) {
  const { updateQuantity, displayMenu, queryCart } = useCartQuantity();

  return (
    <Fragment>
      {queryCart &&
        displayMenu &&
        props.query.department.catalog.map((catalog, index) => (
          <DepartmentCatalogItem key={index}>
            <Link to={"catalog/" + catalog.id}>
              <img src="/walmartLogoSmall.png" />
            </Link>
            <PriceWrapper>
              <div>
                <b>${catalog.price}</b>
              </div>
              <AddCartButton
                onClick={() => {
                  if (!displayMenu[catalog.id]) {
                    updateQuantity(catalog.id, 1, true);
                  }
                }}
              >
                Add cart
              </AddCartButton>
              {displayMenu[catalog.id]?.displayMenu && (
                <QuantityMenu>
                  <button
                    className="quantity-add"
                    onClick={() => {
                      updateQuantity(
                        catalog.id,
                        displayMenu[catalog.id].quantity + 1,
                        true
                      );
                    }}
                  >
                    <RiAddLine />
                  </button>
                  <div>
                    <b>{displayMenu[catalog.id].quantity}</b>
                  </div>
                  <button
                    className="quantity-remove"
                    onClick={() => {
                      updateQuantity(
                        catalog.id,
                        displayMenu[catalog.id].quantity - 1,
                        true
                      );
                    }}
                  >
                    <RiSubtractFill />
                  </button>
                </QuantityMenu>
              )}
            </PriceWrapper>
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
        ))}
    </Fragment>
  );
}
