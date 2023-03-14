import ProductCard from "@/components/Product/Card1";
import ProductContainer from "@/components/Product/Container";
import ProductFilters from "@/components/Product/Filters";
import ProductPagination from "@/components/Product/Pagination";
import Head from "next/head";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export default function Page({
  products,
  brands,
  department,
  productsCount,
  brandsCount,
  pagination,
}) {
  return (
    <>
      <Head>
        <title>{`Walmart.com - ${department}`}</title>
      </Head>
      <Wrapper>
        <h2>
          {department}{" "}
          <span
            style={{
              color: "lightgray",
              fontSize: "large",
              fontWeight: "lighter",
            }}
          >
            ({productsCount})
          </span>
        </h2>

        <ProductFilters brands={brands} brandsCount={brandsCount} />

        <ProductContainer>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductContainer>

        <ProductPagination pagination={pagination} />
      </Wrapper>
    </>
  );
}
