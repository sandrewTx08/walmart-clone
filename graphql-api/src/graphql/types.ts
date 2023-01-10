import { arg, nonNull, objectType } from "nexus";
import prisma from "../../utils/prisma";

export const Catalogs = objectType({
  name: "Catalogs",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.int("price");
    t.nonNull.id("product_id");
    t.nonNull.field("Products", {
      type: "Products",
      resolve(s) {
        return prisma.products.findUnique({
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
      resolve(s) {
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
    t.nonNull.int("brand_id");
    t.nonNull.field("ProductTypes", {
      type: "ProductTypes",
      resolve(s) {
        return prisma.productTypes.findUnique({
          where: { id: s.product_type_id },
        });
      },
    });
    t.nonNull.list.field("ProductRates", {
      type: "ProductRates",
      resolve(s) {
        return prisma.productRates.findMany({
          where: { id: s.product_id },
        });
      },
    });
    t.nonNull.field("Brands", {
      type: "Brands",
      resolve(s) {
        return prisma.brands.findUnique({
          where: { id: s.brand_id },
        });
      },
    });
  },
});

export const ProductRates = objectType({
  name: "ProductRates",
  definition(t) {
    t.nonNull.int("rate");
    t.nonNull.id("id");
    t.nonNull.string("description");
    t.nonNull.string("user_id");
    t.nonNull.field("User", {
      type: "User",
      resolve(s) {
        return prisma.users.findUnique({
          where: { id: s.user_id },
        });
      },
    });
  },
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("first_name");
  },
});

export const Brands = objectType({
  name: "Brands",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("name");
  },
});
