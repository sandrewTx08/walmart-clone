import styled from "styled-components";
import Cart from "@/components/Product/Cart";
import { useContext } from "react";
import { CartContext } from "@/contexts/Cart";
import Link from "next/link";

const A = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const B = styled.img`
  width: 100%;
  height: auto;
`;

export default function C({ product }) {
  const [_, dispatch] = useContext(CartContext);

  return (
    <A>
      <div>
        <B
          src={
            (product?.ProductPhotos?.length &&
              product?.ProductPhotos[0].Photos?.path) ||
            "/logo-small.png"
          }
        />
        <Cart
          onClick={() => {
            dispatch({ type: "SUM", payload: { product } });
          }}
        >
          <b>Add</b>
        </Cart>
      </div>
      <Link
        href={"/product/" + product.name.replace(" ", "-") + "/" + product.id}
      >
        <div style={{ fontSize: "large" }}>
          <b>{product.price}</b>
        </div>
        <div>{product.name}</div>
      </Link>
    </A>
  );
}
