import styled from "styled-components";
import Cart from "@/components/Product/Cart";
import { useContext } from "react";
import { CartContext } from "@/contexts/Cart";
import Link from "next/link";
import { MdAdd } from "react-icons/md";

const A = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const B = styled.img`
  width: 100%;
  height: auto;
  display: inline-block;
  margin: auto;
`;

export default function C({ product }) {
  const [state, dispatch] = useContext(CartContext);
  const href = "/product/" + product.name.replace(" ", "-") + "/" + product.id;

  return (
    <A>
      <Link href={href}>
        <B
          src={
            (product?.ProductPhotos?.length &&
              product?.ProductPhotos[0].Photos?.path) ||
            "/comingSoon.png"
          }
        />
      </Link>

      <Cart
        style={{
          marginLeft: "auto",
          display: "flex",
        }}
        onClick={() => {
          dispatch({ type: "SUM", payload: { product } });
        }}
      >
        <MdAdd fontSize="x-large" />
        Add
      </Cart>

      <Link href={href}>
        <div style={{ fontSize: "large" }}>
          <b>{product.price}</b>
        </div>
        <div>{product.name}</div>
      </Link>
    </A>
  );
}
