import styled from "styled-components";
import Cart from "@/components/Product/Cart";

const Wrapper = styled.div`
  display: inline-flex;
  height: 100px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: 1em;
`;

const Img = styled.img`
  width: auto;
  height: 100%;
`;

const Price = styled.div`
  margin-left: auto;
  font-weight: bold;
`;

const Title = styled.div`
  font-weight: lighter;
  color: gray;
`;

export default function C({ product }) {
  return (
    <div>
      <Wrapper>
        <Img
          src={
            (product?.ProductPhotos?.length &&
              product?.ProductPhotos[0]?.Photos?.path) ||
            "/comingSoon.png"
          }
        />

        <Title>{product.name}</Title>

        <Price>{product.price}$</Price>
      </Wrapper>

      <div style={{ display: "flex", justifyContent: "end" }}>
        <Cart product={product} />
      </div>
    </div>
  );
}
