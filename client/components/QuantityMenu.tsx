import styled from "styled-components";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import { RiAddLine, RiSubtractFill } from "react-icons/ri";

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
    }>(),
    [catalogLength, catalogLengthSet] = useState(0);

  function QuantityMenu(
    props: React.PropsWithChildren<{ catalog_id: number }>
  ) {
    function QuantityAddButton() {
      return (
        <button
          className="quantity-add"
          onClick={() => {
            quantityUpdate(
              props.catalog_id,
              quantity[props.catalog_id].quantity + 1
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
              props.catalog_id,
              quantity[props.catalog_id].quantity - 1
            );
          }}
        >
          <RiSubtractFill />
        </button>
      );
    }

    return (
      <Fragment>
        {quantity[props.catalog_id]?.quantity === 12 ? (
          <div>
            <b>Max 12</b>
            <QuantityRemoveButton />
          </div>
        ) : quantity[props.catalog_id]?.quantity > 0 ? (
          <div>
            <QuantityAddButton />
            <b>{quantity[props.catalog_id].quantity}</b>
            <QuantityRemoveButton />
          </div>
        ) : (
          <AddCartButton
            onClick={() => {
              quantityUpdate(props.catalog_id, 1);
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

    (q === 0
      ? cart.cartDelete({ catalog_id: id })
      : cart.cartUpdate({
          catalog_id: id,
          quantity: q,
        })
    ).then(() => {
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

  useEffect(() => {
    if (quantity) {
      catalogLengthSet(Object.keys(quantity).length);
    }
  }, [quantity]);

  return {
    quantityUpdate,
    quantity,
    QuantityMenu,
    catalogLength,
  };
}
