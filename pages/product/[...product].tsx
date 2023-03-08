import apolloClient from "@/utils/apolloClient";
import { gql } from "@apollo/client/core";
import { GetServerSidePropsContext } from "next";
import Product from "@/components/Product/Product";

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const [name, id] = params.product as string[];
  const { data } = await apolloClient.query({
    query: gql`
      query Query($name: String!, $id: Int!) {
        products(name: $name, id: $id) {
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
    variables: { name: name.replace("-", " "), id: Number(id) },
  });
  console.log(data);

  return { props: data };
}

export default function Page({ products }) {
  // return <Product product={products[0]} />;
}
