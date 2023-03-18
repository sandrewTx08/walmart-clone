import { CartContext } from "@/contexts/Cart";
import Card2 from "@/components/Product/Card2";
import Card3 from "@/components/Product/Card3";
import styled from "styled-components";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import { useContext, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const CartItemLargeContainer = styled.div`
  border: 0 solid gray;
  padding: 1em;
  border-radius: 1em;
  padding: 1em;
`;

const HeaderItemCount = styled.span`
  color: gray;
  font-size: large;
`;

const Header = styled.div`
  border-radius: 1em;
  display: flex;
  justify-content: space-between;
  padding: 1em;
`;

const CartItemMenuLargeButton = styled.div``;

const CheckoutButton = styled.button`
  background-color: var(--WALMART-BLUE);
  color: white;
  padding: 1em;
  display: block;
  width: 80%;
  margin: auto;
  border-radius: 2em;
  font-weight: bold;
`;

const CartItemSmallContainer = styled(CartItemLargeContainer)`
  display: flex;
  gap: 6px;
`;

const CartItemLarge = styled.div`
  border-top: 1px solid lightgray;
  padding: 1em;

  &:nth-child(1) {
    border-top: 0;
  }
`;

const MobileCheckout = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  @media only screen and(max-width: 1024px) {
    display: none;
  }
`;

export default function C() {
  const [dropdownCartItem, dropdownCartItemSet] = useState(false);
  const [state] = useContext(CartContext);
  const products = Object.keys(state.product).map(
    (key) => state.product[key as unknown as number]
  );

  return (
    <Wrapper>
      <h1>
        Cart <HeaderItemCount>({state.quantity} items)</HeaderItemCount>
      </h1>

      <Header
        className="shadow-soft"
        onClick={() => {
          dropdownCartItemSet(!dropdownCartItem);
        }}
      >
        <h3>{state.quantity} items</h3>

        <CartItemMenuLargeButton>
          {state.quantity > 0 &&
            (dropdownCartItem ? <SlArrowDown /> : <SlArrowRight />)}
        </CartItemMenuLargeButton>
      </Header>

      {state.quantity > 0 ? (
        dropdownCartItem ? (
          <CartItemLargeContainer className="shadow-soft">
            {products.map(
              (product) =>
                state.product[product.id].quantity > 0 && (
                  <CartItemLarge key={product.id}>
                    <Card2 product={product} />
                  </CartItemLarge>
                )
            )}
          </CartItemLargeContainer>
        ) : (
          <CartItemSmallContainer className="shadow-soft">
            {products.map(
              (product) =>
                state.product[product.id].quantity > 0 && (
                  <Card3 product={product} key={product.id} />
                )
            )}
          </CartItemSmallContainer>
        )
      ) : (
        <h2>No item saved.</h2>
      )}

      {state.quantity > 0 && (
        <MobileCheckout>
          <CheckoutButton>Continue to checkout</CheckoutButton>
        </MobileCheckout>
      )}
    </Wrapper>
  );
}
