import styled from "styled-components";
import { CartContext } from "@/contexts/Cart";
import { MdAdd, MdRemove } from "react-icons/md";

const AddButton = styled.button`
  background-color: var(--WALMART-BLUE);
  color: white;
  padding: 6px 12px;
  border-radius: 2em;
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--WALMART-BLUE-DARK);
  }
`;

const Wrapper = styled.div`
  display: inline-flex;
  gap: 6px;
  border: 1px solid gray;
  border-radius: 2em;
  padding: 6px;
  background-color: white;
`;

const SubOrSumButton = styled.button`
  border-radius: 2em;
  line-height: 0;
  padding: 3px;

  &:hover {
    background-color: gray;
    color: white;
  }
`;

const QuantityCount = styled.div`
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
          <Wrapper style={style}>
            <SubOrSumButton
              onClick={() => {
                dispatch({ type: "SUB", payload: { product } });
              }}
            >
              <MdRemove />
            </SubOrSumButton>
            <QuantityCount>Max 12</QuantityCount>
          </Wrapper>
        ) : state.product[product.id]?.quantity > 0 ? (
          <Wrapper style={style}>
            <SubOrSumButton
              onClick={() => {
                dispatch({ type: "SUB", payload: { product } });
              }}
            >
              <MdRemove />
            </SubOrSumButton>
            <QuantityCount>{state.product[product.id].quantity}</QuantityCount>
            <SubOrSumButton
              onClick={() => {
                dispatch({ type: "SUM", payload: { product } });
              }}
            >
              <MdAdd />
            </SubOrSumButton>
          </Wrapper>
        ) : (
          <AddButton
            style={style}
            onClick={() => {
              dispatch({ type: "SUM", payload: { product } });
            }}
          >
            {children}
          </AddButton>
        )
      }
    </CartContext.Consumer>
  );
}
