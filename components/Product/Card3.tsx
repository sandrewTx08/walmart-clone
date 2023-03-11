import { CartContext } from "@/contexts/Cart";
import styled from "styled-components";

const B = styled.img`
  width: 50px;
  height: auto;
  display: block;
`;

const CC = styled.div`
  font-size: x-small;
  position: relative;
  display: flex;
`;

const E = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid black;
  border-radius: 2em;
  line-height: 0.9;
  font-weight: bold;
  width: auto;
  padding: 2px;
  height: auto;
  text-align: center;
`;

export default function C({ product }) {
  return (
    <CartContext.Consumer>
      {([state]) => (
        <CC>
          <E>{state.product[product.id].quantity}</E>

          <B
            src={
              (product?.ProductPhotos?.length &&
                product?.ProductPhotos[0].Photos?.path) ||
              "/comingSoon.png"
            }
          />
        </CC>
      )}
    </CartContext.Consumer>
  );
}
