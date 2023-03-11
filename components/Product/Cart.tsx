import styled from "styled-components";
import { CartContext } from "@/contexts/Cart";
import { MdAdd, MdRemove } from "react-icons/md";

const E = styled.button`
  background-color: var(--WALMART-BLUE);
  color: white;
  padding: 6px 12px;
  border: 0 solid;
  border-radius: 2em;
  display: flex;
  align-items: center;
  

  &:hover {
    background-color: var(--WALMART-BLUE-DARK);
  }
`;

const A = styled.div`
  display: inline-flex;
  gap: 6px;
  border: 1px solid gray;
  border-radius: 2em;
  padding: 6px;
  background-color: white;
`;

const B = styled.button`
  border: 0 solid;
  border-radius: 2em;
  line-height: 0;
  padding: 3px;

  &:hover {
    background-color: gray;
    color: white;
  }
`;

const CC = styled.div`
  position: relative;
  top: 2px;
`;

export default function C({
  children,
  product,
  style,
}: React.PropsWithChildren<{ product; style?: React.CSSProperties }>) {
  return (
    <CartContext.Consumer>
      {([state, dispatch]) =>
        state.product[product.id]?.quantity === 12 ? (
          <A style={style}>
            <B
              onClick={() => {
                dispatch({ type: "SUB", payload: { product } });
              }}
            >
              <MdRemove />
            </B>
            <CC>Max 12</CC>
          </A>
        ) : state.product[product.id]?.quantity > 0 ? (
          <A style={style}>
            <B
              onClick={() => {
                dispatch({ type: "SUB", payload: { product } });
              }}
            >
              <MdRemove />
            </B>
            <CC>{state.product[product.id].quantity}</CC>
            <B
              onClick={() => {
                dispatch({ type: "SUM", payload: { product } });
              }}
            >
              <MdAdd />
            </B>
          </A>
        ) : (
          <E
            style={style}
            onClick={() => {
              dispatch({ type: "SUM", payload: { product } });
            }}
          >
            {children}
          </E>
        )
      }
    </CartContext.Consumer>
  );
}
