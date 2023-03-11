import { CartContext } from "@/contexts/Cart";
import Card2 from "@/components/Product/Card2";
import Card3 from "@/components/Product/Card3";
import styled from "styled-components";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import { useContext, useState } from "react";

const A = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const B = styled.div`
  border: 0 solid gray;
  padding: 1em;
  border-radius: 1em;
`;

const CC = styled.span`
  color: gray;
  font-size: large;
`;

const D = styled.div`
  border: 0 solid;
  border-radius: 1em;
  display: flex;
  justify-content: space-between;
  padding: 1em;
`;

const E = styled.div``;

const F = styled.div``;

const G = styled(B)`
  display: flex;
  gap: 6px;
`;

const H = styled.div`
  border-top: 1px solid lightgray;
  padding: 1em;

  &:nth-child(1) {
    border-top: 0;
  }
`;

export default function C() {
  const [x, xs] = useState(false);
  const [state, dispath] = useContext(CartContext);
  const products = Object.keys(state.product).map(
    (key) => state.product[key as unknown as number]
  );

  return (
    <div>
      <A>
        <h1>
          Cart <CC>({state.quantity} items)</CC>
        </h1>

        <D className="shadow-soft">
          <h3>{state.quantity} items</h3>

          <div
            onClick={() => {
              xs(!x);
            }}
          >
            <E>
              {products.length > 0 && (x ? <SlArrowDown /> : <SlArrowRight />)}
            </E>
          </div>
        </D>

        {products.length > 0 &&
          (x ? (
            <B className="shadow-soft">
              {products.map((product) => (
                <H key={product.id}>
                  <Card2 product={product} />
                </H>
              ))}
            </B>
          ) : (
            <G className="shadow-soft">
              {products.map((product) => (
                <Card3 product={product} key={product.id} />
              ))}
            </G>
          ))}
      </A>

      <F></F>
    </div>
  );
}
