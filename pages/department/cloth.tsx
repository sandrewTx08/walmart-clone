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
        }
      }
    `,
    variables: { departmentId: Departments.Cloth },
  });

  return { props: data };
}

export default function Page({ products }: { products: Products[] }) {
  return (
    <ProductContainer>
      {products.map(({ name, price, id }) => (
        <ProductCard key={id} product={{ name, price, id }} />
      ))}
    </ProductContainer>
  );
}
