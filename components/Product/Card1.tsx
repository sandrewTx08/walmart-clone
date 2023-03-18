import styled from "styled-components";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import Cart from "@/components/Product/Cart";

const Wrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: auto;
  height: 100%;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export default function C({ product }) {
  const href = "/product/" + product.name.replace(" ", "-") + "/" + product.id;

  return (
    <Wrapper>
      <Link href={href}>
        <Img
          src={
            (product?.ProductPhotos?.length &&
              product?.ProductPhotos[0].Photos?.path) ||
            "/comingSoon.png"
          }
        />
      </Link>

      <div>
        <Cart product={product}>
          <MdAdd />
          <b>Add</b>
        </Cart>
      </div>

      <Link href={href}>
        <div style={{ fontSize: "x-large" }}>
          <b>{product.price}$</b>
        </div>
        <div style={{ fontSize: "large" }}>{product.name}</div>
      </Link>
    </Wrapper>
  );
}
