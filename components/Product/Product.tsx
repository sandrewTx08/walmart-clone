import styled from "styled-components";
import Cart from "@/components/Product/Cart";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { findDepartmentById } from "@/departments";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  grid-auto-rows: minmax(auto, auto);
  grid-gap: 1em;
  position: relative;
  overflow: hidden;
`;

const Photos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100px;
`;

const Photo = styled.div`
  width: 400px;
  margin: auto;
`;

const Details = styled.div`
  padding: 12px;
  gap: 1em;
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  min-width: 200px;
  min-height: 400px;
  background-color: white;
  position: fixed;
  right: 1em;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  display: inline-block;
`;

const Brand = styled.div`
  text-decoration: underline;
  margin-top: 1em;
`;

export default function C({ product }) {
  const [x, xs] = useState(0);
  const photos = product.ProductPhotos.map(({ Photos }, index) => (
    <Img
      onClick={() => {
        xs(index);
      }}
      src={Photos.path}
      key={Photos.id}
    />
  ));

  return (
    <>
      <Head>
        <title>{`Walmart.com - ${product.name}`}</title>
      </Head>

      <Wrapper>
        <Photos>{photos}</Photos>

        <Photo>{photos[x]}</Photo>

        <Details className="shadow-soft">
          <Brand>
            <Link
              href={{
                pathname:
                  "/department/" +
                  findDepartmentById(product.departmentId).alias,
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
    </>
  );
}
