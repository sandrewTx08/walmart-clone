import styled from "styled-components";
import Cart from "@/components/Product/Cart";
import { useState } from "react";

const A = styled.div`
  display: grid;
  grid-template-columns: 2fr 6fr 4fr;
  grid-auto-rows: minmax(auto, 500px);
  grid-gap: 1em;
`;

const B = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100px;
`;

const CC = styled.div`
  width: 400px;
  margin: auto;
`;

const D = styled.div`
  padding: 12px;
  gap: 1em;
  display: flex;
  flex-direction: column;
  border: 0 solid;
  border-radius: 1em;
  min-width: 200px;
  background-color: white;

  @media only screen and (max-width: 1024px) {
  }
`;

const E = styled.img`
  width: 100%;
  height: auto;
  display: inline-block;
`;

const F = styled.div`
  text-decoration: underline;
  margin-top: 1em;
`;

export default function C({ product }) {
  const [x, xs] = useState(0);
  const photos = product.ProductPhotos.map(({ Photos }, index) => (
    <E
      onClick={() => {
        xs(index);
      }}
      src={Photos.path}
      key={Photos.id}
    />
  ));

  return (
    <A>
      <B>{photos}</B>

      <CC>{photos[x]}</CC>

      <D className="shadow-soft">
        <F>{product.Brands.name}</F>
        <div>{product.name}</div>
        <div style={{ fontSize: "x-large" }}>
          <b>{product.price}$</b>
        </div>
        <span>
          <Cart product={product}>Add to Cart</Cart>
        </span>
      </D>
    </A>
  );
}
