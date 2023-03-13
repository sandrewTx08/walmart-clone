import Product from "@/components/Product";
import { Departments } from "@/departments";
import prisma from "@/utils/prismaClient";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const brandsId =
    query.brands instanceof Array
      ? [...query.brands.map((brand) => Number(brand))]
      : Number(query.brands) || undefined;

  const [productsCount, products, brandsCount, brands] =
    await prisma.$transaction([
      prisma.products.count({
        where: { departmentId: Departments.Clothes, brandId: { in: brandsId } },
      }),
      prisma.products.findMany({
        where: { departmentId: Departments.Clothes, brandId: { in: brandsId } },
        include: { ProductPhotos: { include: { Photos: true } } },
      }),
      prisma.brands.findMany({
        include: { _count: true },
        where: {
          Products: {
            some: {
              departmentId: Departments.Clothes,
            },
          },
        },
      }),
      prisma.brands.findMany({
        where: {
          Products: {
            some: {
              departmentId: Departments.Clothes,
              brandId: {
                in: brandsId,
              },
            },
          },
        },
      }),
    ]);

  return {
    props: {
      products: products.map((data) => ({
        ...data,
        price: data.price.toNumber(),
      })),
      brands,
      brandsCount,
      productsCount,
    },
  };
}

export default function Page(props) {
  return <Product {...props} department="Clothes" />;
}
