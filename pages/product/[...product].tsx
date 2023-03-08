import { GetServerSidePropsContext } from "next";
import Product from "@/components/Product/Product";
import prisma from "@/utils/prismaClient";

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const [name, id] = params.product as string[];
  const data = await prisma.products.findFirst({
    where: { name: name.replace("-", " "), id: Number(id) },
    include: { ProductPhotos: { include: { Photos: true } } },
  });

  console.log(data);

  return {
    props: { product: { ...data, price: data.price.toNumber() } },
  };
}

export default function Page({ product }) {
  return <Product product={product} />;
}
