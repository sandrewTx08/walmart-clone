import ProductCard from "@/components/Product/Card";
import ProductContainer from "@/components/Product/Container";
import prisma from "@/utils/prismaClient";
import { Products } from "prisma/prisma-client";

export async function getServerSideProps() {
  const data = await prisma.products.findMany({
    select: { id: true, name: true, price: true },
  });

  return {
    props: {
      data: data.map(({ name, price, id }) => ({
        name,
        price: price.toNumber(),
        id,
      })),
    },
  };
}

export default function Index({ data }: { data: Products[] }) {
  return (
    <ProductContainer>
      {data.map(({ name, price, id }) => (
        <ProductCard key={id} product={{ name, price, id }} />
      ))}
    </ProductContainer>
  );
}
