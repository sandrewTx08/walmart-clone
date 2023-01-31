import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";

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
  const [cart, queryCart] = useContext(CartContext),
    [displayMenu, displayMenuSet] = useState<{
      [catalog_id: number]: { quantity: number; displayMenu: boolean };
    }>();

  function updateQuantity(id: number, q: number, d: boolean) {
    displayMenuSet({
      ...displayMenu,
      [id]: {
        ...displayMenu[id],
        quantity: q,
        displayMenu: d,
      },
    });
    cart.cartUpdate({
      catalog_id: id,
      quantity: q,
    });
  }

  useEffect(() => {
    displayMenuSet(
      queryCart.cart.reduce<typeof displayMenu>((o, c) => {
        o[c.catalog_id] = {
          quantity: c.quantity,
          displayMenu: c.quantity ? true : false,
        };
        return o;
      }, Object())
    );
  }, [queryCart]);

  return { updateQuantity, displayMenu, queryCart };
}
