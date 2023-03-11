import styled from "styled-components";
import Cart from "@/components/Product/Cart";

const A = styled.div`
  display: inline-flex;
  height: 100px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: 1em;
`;

const B = styled.img`
  width: auto;
  height: 100%;
`;

const CC = styled.div`
  margin-left: auto;
  font-weight: bold;
`;

const D = styled.div`
  font-weight: lighter;
  color: gray;
`;

export default function C({ product }) {
  return (
    <div>
      <A>
        <B
          src={
            (product?.ProductPhotos?.length &&
              product?.ProductPhotos[0].Photos?.path) ||
            "/comingSoon.png"
          }
        />

        <D>{product.name}</D>

        <CC>{product.price}$</CC>
      </A>

      <div style={{ display: "flex", justifyContent: "end" }}>
        <Cart product={product} />
      </div>
    </div>
  );
}
