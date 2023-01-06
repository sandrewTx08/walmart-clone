import { arg, nonNull, objectType } from "nexus";
import { argsToPrisma } from "../helpers/resolver";
import prisma from "../../utils/prisma";

export const Catalogs = objectType({
  name: "Catalogs",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.int("price");
    t.nonNull.int("product_id");
    t.nonNull.field("Products", {
      type: "Products",
      resolve(s, a) {
        return prisma.products.findUnique({
          select: argsToPrisma(a),
          where: { id: s.product_id },
        });
      },
    });
  },
});

export const ProductTypes = objectType({
  name: "ProductTypes",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.id("id");
    t.nonNull.int("_count", {
      resolve(s, a) {
        return prisma.products.count({
          where: { product_type_id: s.id },
        });
      },
    });
    t.list.nonNull.field("catalog", {
      type: "Catalogs",
      args: {
        limit: nonNull(arg({ type: "Int" })),
        store_id: arg({ type: "Int" }),
      },
      resolve(s, a) {
        return prisma.catalogs.findMany({
          orderBy: { id: "desc" },
          take: a.limit,
          where: {
            store_id: a.store_id,
            Products: { product_type_id: s.id },
          },
        });
      },
    });
  },
});

export const Products = objectType({
  name: "Products",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.id("id");
    t.nonNull.field("ProductTypes", {
      type: "ProductTypes",
      resolve(s, a) {
        return prisma.productTypes.findUnique({
          select: argsToPrisma(a),
          where: { id: s.product_type_id },
        });
      },
    });
    t.nonNull.list.field("ProductRates", {
      type: "ProductRates",
      resolve(s, a) {
        return prisma.productRates.findMany({
          select: argsToPrisma(a),
          where: { id: s.product_id },
        });
      },
    });
  },
});

export const ProductRates = objectType({
  name: "ProductRates",
  definition(t) {
    t.nonNull.string("rate");
    t.nonNull.id("id");
  },
});
