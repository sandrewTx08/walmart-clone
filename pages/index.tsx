import Home from "@/components/Home/Home1";
import prisma from "@/utils/prismaClient";

export async function getServerSideProps() {
  const data = await prisma.products.findFirst({
    include: { ProductPhotos: { include: { Photos: true } } },
  });

  return {
    props: { product: { ...data, price: data.price.toNumber() } },
  };
}

export default function C({ product }) {
  return <Home product={product} />;
}
