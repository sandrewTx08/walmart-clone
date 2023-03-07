import prisma from "@/utils/prismaClient";
import ProductCard from "@/components/Product/Card";
import ProductContainer from "@/components/Product/Container";

export default async function Page() {
  const products = await prisma.products.findMany({
    select: { id: true, name: true, price: true },
  });

  return (
    <ProductContainer>
      {products.map(({ name, price, id }) => (
        <ProductCard key={id} product={{ name, price: price.toNumber(), id }} />
      ))}
    </ProductContainer>
  );
}
