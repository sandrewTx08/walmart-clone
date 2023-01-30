import { Link } from "react-router-dom";
import { Query } from "../graphql-types";
import styled from "styled-components";
import StarRate from "./StarRate";
import { Fragment, useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import { RiAddLine, RiSubtractFill } from "react-icons/ri";

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

const AddCartButton = styled.button`
  padding: 7px;
  background-color: var(--WALMART-BLUE);
  color: white;
  border-radius: 12px;
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

const QuantityMenu = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function (props: React.PropsWithChildren<{ query: Query }>) {
  const cart = useContext(CartContext),
    [cartSave, cartSavedSet] = useState<Query>(),
    [quantityMenu, quantityMenuSet] = useState<{
      [catalog_id: number]: { quantity: number; showMenu?: boolean };
    }>();

  useEffect(() => {
    cart.cartGet().then((value) => {
      cartSavedSet(value);
    });
  }, []);

  useEffect(() => {
    if (cartSave) {
      const o = Object();
      cartSave.cart.forEach((c) => {
        o[c.catalog_id] = {
          quantity: c.quantity,
          showMenu: c.quantity ? true : false,
        };
      });
      quantityMenuSet(o);
    }
  }, [cartSave]);

  return (
    <Fragment>
      {cartSave &&
        quantityMenu &&
        props.query.department.catalog.map((catalog) => (
          <DepartmentCatalogItem>
            <Link to={"catalog/" + catalog.id}>
              <img src="/walmartLogoSmall.png" />
            </Link>
            <PriceWrapper>
              <div>
                <b>${catalog.price}</b>
              </div>
              <AddCartButton
                onClick={() => {
                  if (!quantityMenu[catalog.id]) {
                    quantityMenuSet({
                      ...quantityMenu,
                      [catalog.id]: {
                        ...quantityMenu[catalog.id],
                        quantity: 1,
                        showMenu: true,
                      },
                    });
                    cart.cartUpdate({
                      catalog_id: catalog.id,
                      quantity: 1,
                    });
                  } else {
                    quantityMenuSet({
                      ...quantityMenu,
                      [catalog.id]: {
                        ...quantityMenu[catalog.id],
                        showMenu: true,
                      },
                    });
                    cart.cartUpdate({
                      catalog_id: catalog.id,
                      quantity: quantityMenu[catalog.id].quantity,
                    });
                  }
                }}
              >
                Add cart
              </AddCartButton>
              {quantityMenu[catalog.id]?.showMenu && (
                <QuantityMenu>
                  <button
                    className="quantity-add"
                    onClick={() => {
                      quantityMenuSet({
                        ...quantityMenu,
                        [catalog.id]: {
                          ...quantityMenu[catalog.id],
                          quantity: quantityMenu[catalog.id].quantity + 1,
                        },
                      });
                      cart.cartUpdate({
                        catalog_id: catalog.id,
                        quantity: quantityMenu[catalog.id].quantity + 1,
                      });
                    }}
                  >
                    <RiAddLine />
                  </button>
                  <div>
                    <b>{quantityMenu[catalog.id].quantity}</b>
                  </div>
                  <button
                    className="quantity-remove"
                    onClick={() => {
                      quantityMenuSet({
                        ...quantityMenu,
                        [catalog.id]: {
                          ...quantityMenu[catalog.id],
                          quantity: quantityMenu[catalog.id].quantity - 1,
                        },
                      });
                      cart.cartUpdate({
                        catalog_id: catalog.id,
                        quantity: quantityMenu[catalog.id].quantity - 1,
                      });
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
