import styled from "styled-components";
import { useContext, useEffect, useState, Fragment } from "react";
import { CartContext } from "../App";
import { RiAddLine, RiSubtractFill } from "react-icons/ri";

const QuantityMenuButton = styled.div`
  display: flex;
  border: 1px solid gray;
  padding: 3px;
  justify-content: space-between;
  justify-items: center;
  border-radius: 1em;
  height: 20px;

  & > * {
    margin: 0 3px;
  }

  span {
    display: block;
  }

  button {
    height: 0;
  }

  svg {
    height: 0px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }

  button svg {
    color: black;
    background-color: white;
  }

  button svg:hover {
    color: white;
    background-color: gray;
  }
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
          <QuantityMenuButton>
            <span>
              <b>Max 12</b>
            </span>
            <QuantityRemoveButton />
          </QuantityMenuButton>
        ) : quantity[props.catalog_id]?.quantity > 0 ? (
          <QuantityMenuButton>
            <QuantityAddButton />
            <span>{quantity[props.catalog_id].quantity}</span>
            <QuantityRemoveButton />
          </QuantityMenuButton>
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
      query.cart.items.reduce<typeof quantity>((o, c) => {
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
