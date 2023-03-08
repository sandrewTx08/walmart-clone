import ProductCard from "@/components/Product/Card";
import ProductContainer from "@/components/Product/Container";
import { Departments } from "@/departments";
import apolloClient from "@/utils/apolloClient";
import { gql } from "@apollo/client/core";
import { Products } from "prisma/prisma-client";

export async function getServerSideProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query Query($departmentId: Int!) {
        products(departmentId: $departmentId) {
          name
          price
          id
          ProductPhotos {
            id
            path
          }
        }
      }
    `,
    variables: { departmentId: Departments.Games },
  });

  return { props: data };
}

export default function Page({ products }) {
  return (
    <ProductContainer>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductContainer>
  );
}
