import Product from "@/components/Product";
import { findDepartment } from "@/departments";
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

  const [_, department] = findDepartment(params.department as string);

  const [productsCount, products, brandsCount, brands] = await Promise.all([
    prisma.products.count({
      where: { brandId: { in: brandsId }, departmentId: department.id },
    }),
    prisma.products.paginate({
      where: { departmentId: department.id, brandId: { in: brandsId } },
      include: { ProductPhotos: { include: { Photos: true }, take: 1 } },
      orderBy: { price: query.sortByPrice as unknown as any },
      limit: 8,
      page: Number(query.page) || 1,
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

  products.result = products.result.map((data) => ({
    ...data,
    price: data.price.toNumber(),
  })) as unknown as any;

  products.nextPage = null as unknown as any;

  return {
    props: {
      products: products.result,
      brands,
      brandsCount,
      productsCount,
      department,
      pagination: products,
    },
  };
}

export default function Page(props) {
  return <Product {...props} department={props.department.name} />;
}
