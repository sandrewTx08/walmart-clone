import styled from "styled-components";
import Cart from "@/components/Product/Cart";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { findDepartment } from "@/departments";

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  height: 100vh;
  overflow-x: visible;
`;

const Photos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 120px;
  height: 120px;
`;

const Details = styled.div`
  padding: 12px;
  gap: 1em;
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  background-color: white;
  position: sticky;
  width: 300px;
  top: 0;
  right: 1em;
  height: 400px;
`;

const Img = styled.img`
  width: 100%;
  display: block;
  margin: 0 auto auto;
`;

const Brand = styled.div`
  text-decoration: underline;
  margin-top: 1em;
`;

export default function C({ product }) {
  const [photo, photoSet] = useState(0);
  const photos = product.ProductPhotos.map(({ Photos }, index) => (
    <Img
      onClick={() => {
        photoSet(index);
      }}
      src={Photos.path}
      key={Photos.id}
    />
  ));

  return (
    <Wrapper>
      <Head>
        <title>{`Walmart.com - ${product.name}`}</title>
      </Head>

      <Photos>{photos}</Photos>

      {photos[photo] || <Img src="/comingSoon.png" />}

      <Details className="shadow-soft">
        <Brand>
          <Link
            href={{
              pathname:
                "/department/" + findDepartment(product.departmentId)[0][0],
              query: { brands: product.Brands.id },
            }}
          >
            {product.Brands.name}
          </Link>
        </Brand>
        <div>{product.name}</div>
        <div style={{ fontSize: "x-large" }}>
          <b>{product.price}$</b>
        </div>
        <span>
          <Cart product={product}>
            <b>Add to Cart</b>
          </Cart>
        </span>
      </Details>
    </Wrapper>
  );
}
