import styled from "styled-components";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import Cart from "@/components/Product/Cart";

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

      <Cart product={product}>
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
