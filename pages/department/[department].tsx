import Product from "@/components/Product";
import { Departments } from "@/departments";
import prisma from "@/utils/prismaClient";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps({
  query,
  params,
}: GetServerSidePropsContext) {
  const brandsId =
    query.brands instanceof Array
      ? query.brands.map((brand) => Number(brand))
      : Number(query.brands) || undefined;

  const department = Departments[params.department as string];

  const [productsCount, products, brandsCount, brands] =
    await prisma.$transaction([
      prisma.products.count({
        where: { brandId: { in: brandsId }, departmentId: department.id },
      }),
      prisma.products.findMany({
        where: { departmentId: department.id, brandId: { in: brandsId } },
        include: { ProductPhotos: { include: { Photos: true }, take: 1 } },
        orderBy: { price: query.sortByPrice as unknown as any },
      }),
      prisma.brands.findMany({
        include: { _count: true },
        where: { Products: { some: { departmentId: department.id } } },
      }),
      prisma.brands.findMany({
        where: {
          Products: {
            some: { departmentId: department.id, brandId: { in: brandsId } },
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
      department,
    },
  };
}

export default function Page(props) {
  return <Product {...props} department={props.department.name} />;
}
