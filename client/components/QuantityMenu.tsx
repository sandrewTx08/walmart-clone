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
  const [cart, query] = useContext(CartContext),
    [quantity, quantitySet] = useState<{
      [catalog_id: number]: { quantity: number };
    }>();

  function QuantityMenu(props: React.PropsWithChildren<{ catalog: Catalogs }>) {
    return (
      <Fragment>
        {quantity[props.catalog.id]?.quantity > 0 ? (
          <Fragment>
            <button
              className="quantity-add"
              onClick={() => {
                updateQuantity(
                  props.catalog.id,
                  quantity[props.catalog.id].quantity + 1
                );
              }}
            >
              <RiAddLine />
            </button>
            <div>
              <b>{quantity[props.catalog.id].quantity}</b>
            </div>
            <button
              className="quantity-remove"
              onClick={() => {
                updateQuantity(
                  props.catalog.id,
                  quantity[props.catalog.id].quantity - 1
                );
              }}
            >
              <RiSubtractFill />
            </button>
          </Fragment>
        ) : (
          <AddCartButton
            onClick={() => {
              updateQuantity(props.catalog.id, 1);
            }}
          >
            Add cart
          </AddCartButton>
        )}
      </Fragment>
    );
  }

  function updateQuantity(id: number, q: number) {
    quantitySet({
      ...quantity,
      [id]: {
        ...quantity[id],
        quantity: q,
      },
    });
    cart.cartUpdate({
      catalog_id: id,
      quantity: q,
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

  return { updateQuantity, quantity, query, QuantityMenu };
}
