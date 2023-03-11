import ProductCard from "@/components/Product/Card1";
import ProductContainer from "@/components/Product/Container";
import { Departments } from "@/departments";
import prisma from "@/utils/prismaClient";

export async function getServerSideProps() {
  const data = await prisma.products.findMany({
    where: { departmentId: Departments.Food },
    include: { ProductPhotos: { include: { Photos: true } } },
  });

  return {
    props: {
      products: data.map((data) => ({ ...data, price: data.price.toNumber() })),
    },
  };
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
