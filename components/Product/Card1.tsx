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

      <div style={{ position: "absolute", fontSize: "small" }}>
        <Cart product={product} style={{ position: "relative", bottom: 43 }}>
          <MdAdd />
          Add
        </Cart>
      </div>

      <Link href={href}>
        <div>
          <b>{product.price}$</b>
        </div>
        <div>{product.name}</div>
      </Link>
    </A>
  );
}
