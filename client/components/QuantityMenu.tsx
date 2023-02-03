import styled from "styled-components";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import { RiAddLine, RiSubtractFill } from "react-icons/ri";
import { Catalogs } from "../graphql-types";

export const QuantityMenu = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddCartButton = styled.button`
  padding: 7px;
  background-color: var(--WALMART-BLUE);
  color: white;
  border-radius: 12px;
`;

export function useCartQuantity() {
  const [cart, [query, querySet]] = useContext(CartContext),
    [quantity, quantitySet] = useState<{
      [catalog_id: number]: { quantity: number };
    }>();

  function QuantityMenu(props: React.PropsWithChildren<{ catalog: Catalogs }>) {
    function QuantityAddButton() {
      return (
        <button
          className="quantity-add"
          onClick={() => {
            quantityUpdate(
              props.catalog.id,
              quantity[props.catalog.id].quantity + 1
            );
          }}
        >
          <RiAddLine />
        </button>
      );
    }

    function QuantityRemoveButton() {
      return (
        <button
          className="quantity-remove"
          onClick={() => {
            quantityUpdate(
              props.catalog.id,
              quantity[props.catalog.id].quantity - 1
            );
          }}
        >
          <RiSubtractFill />
        </button>
      );
    }

    return (
      <Fragment>
        {quantity[props.catalog.id]?.quantity === 12 ? (
          <div>
            <b>Max 12</b>
            <QuantityRemoveButton />
          </div>
        ) : quantity[props.catalog.id]?.quantity > 0 ? (
          <div>
            <QuantityAddButton />
            <b>{quantity[props.catalog.id].quantity}</b>
            <QuantityRemoveButton />
          </div>
        ) : (
          <AddCartButton
            onClick={() => {
              quantityUpdate(props.catalog.id, 1);
            }}
          >
            Add cart
          </AddCartButton>
        )}
      </Fragment>
    );
  }

  function quantityUpdate(id: number, q: number) {
    quantitySet({
      ...quantity,
      [id]: {
        ...quantity[id],
        quantity: q,
      },
    });
    cart
      .cartUpdate({
        catalog_id: id,
        quantity: q,
      })
      .then(() => {
        cart.cartGet().then((q) => {
          querySet(q);
        });
      });
  }

  useEffect(() => {
    quantitySet(
      query.cart.reduce<typeof quantity>((o, c) => {
        o[c.catalog_id] = { quantity: c.quantity };
        return o;
      }, Object())
    );
  }, [query]);

  return { quantityUpdate, quantity, query, QuantityMenu };
}
