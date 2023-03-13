import ProductCard from "@/components/Product/Card1";
import ProductContainer from "@/components/Product/Container";
import ProductFilters from "@/components/Product/Filters";
import styled from "styled-components";

const A = styled.div`
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
}) {
  return (
    <A>
      <h2>
        {department}{" "}
        <span style={{ color: "lightgray", fontSize: "medium" }}>
          ({productsCount})
        </span>
      </h2>

      <ProductFilters brands={brands} brandsCount={brandsCount} />

      <ProductContainer>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductContainer>
    </A>
  );
}
