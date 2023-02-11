import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../App";
import { useCartQuantity } from "./QuantityMenu";

const CheckoutButton = styled.button`
  background-color: var(--WALMART-BLUE);
  color: white;
  padding: 1em;
  font-size: large;
`;

const CartDetails = styled.div`
  padding: 1em;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const CartDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CartWrapper = styled.section`
  display: flex;
  gap: 1em;
`;

const CartList = styled.ul``;

const CartListItem = styled.li`
  display: flex;

  div {
    margin: auto;
  }

  img {
    height: 100px;
    max-width: 100%;
  }
`;

export default function () {
  const [{}, [query]] = useContext(CartContext),
    { QuantityMenu, catalogLength } = useCartQuantity();

  return (
    <CartWrapper>
      {catalogLength > 0 && (
        <CartDetails className="soft-shadow soft-border">
          <CartList>
            {query.cart.items.map((cartItem, index) => (
              <CartListItem key={index}>
                <img src={cartItem.image || "/walmartLogoSmall.png"} />

                <div>{cartItem.name}</div>

                <div>
                  <QuantityMenu catalog_id={cartItem.catalog_id} />
                </div>

                <div>{cartItem.currency_price}</div>
              </CartListItem>
            ))}
          </CartList>
        </CartDetails>
      )}

      <CartDetails
        className="soft-shadow soft-border"
        style={{ maxHeight: 300 }}
      >
        <CheckoutButton className="soft-border">
          Continue to checkout
        </CheckoutButton>

        <CartDiv>
          <div>
            <b>Subtotal</b> (Items {query.cart.quantity})
          </div>
          <div>{query.cart.currency_price_subtotal}</div>
        </CartDiv>

        <CartDiv>
          <b>Estimated total</b>
          <div>{query.cart.currency_price_estimatedtotal}</div>
        </CartDiv>
      </CartDetails>
    </CartWrapper>
  );
}
