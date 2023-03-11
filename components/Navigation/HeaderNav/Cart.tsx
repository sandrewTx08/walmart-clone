import { G } from "@/components/Navigation/HeaderNav";
import { BsCart2 } from "react-icons/bs";
import { CartContext } from "@/contexts/Cart";
import Link from "next/link";
import styled from "styled-components";

const A = styled.div`
  font-size: small;
  background-color: var(--WALMART-YALLOW);
  color: black;
  border: 1px solid #874512;
  border-radius: 50%;
  height: 20px;
  line-height: 2;
  width: 20px;
  text-align: center;
`;

export default function C() {
  return (
    <CartContext.Consumer>
      {([state]) => (
        <G style={{ fontSize: "small" }}>
          <Link href="/cart" style={{ textAlign: "center" }}>
            <div
              style={{ position: "relative", display: "flex", marginBottom: 3 }}
            >
              <BsCart2 style={{ fontSize: "x-large" }} />
              <A style={{ position: "absolute", left: 20, bottom: 10 }}>
                {state.quantity}
              </A>
            </div>
            <div>{state.total}$</div>
          </Link>
        </G>
      )}
    </CartContext.Consumer>
  );
}
