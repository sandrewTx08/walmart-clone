import styled from "styled-components";
import Cart from "@/components/Product/Cart";
import { useContext } from "react";
import { CartContext } from "@/contexts/Cart";

const A = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const B = styled.img`
  width: 100%;
  height: auto;
`;

export default function C({
  product,
}: {
  product: { name: string; price: number; id: number };
}) {
  const [_, dispatch] = useContext(CartContext);

  return (
    <A>
      <div>
        <B src="/logo-small.png" />
        <Cart
          onClick={() => {
            dispatch({ type: "SUM", payload: { product } });
          }}
        >
          <b>Add</b>
        </Cart>
      </div>
      <div style={{ fontSize: "large" }}>
        <b>{product.price}</b>
      </div>
      <div>{product.name}</div>
    </A>
  );
}
