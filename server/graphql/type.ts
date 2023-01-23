import { arg, nonNull, objectType } from "nexus";
import prisma from "../prisma";

export const Cart = objectType({
  name: "Carts",
  definition(t) {
    t.nonNull.int("price");
    t.nonNull.int("product_id");
    t.nonNull.int("catalog_id");
    t.nonNull.int("quantity");
    t.nonNull.id("user_id");
    t.nonNull.string("name");
    t.nonNull.string("image");
  },
});

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

export const Departments = objectType({
  name: "Departments",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.id("id");
    t.nonNull.int("_count", {
      resolve(s) {
        return prisma.products.count({
          where: { department_id: s.id },
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
            Products: { department_id: s.id },
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
    t.nonNull.id("brand_id");
    t.nonNull.field("Departments", {
      type: "Departments",
      resolve(s) {
        return prisma.departments.findUnique({
          where: { id: s.department_id },
        });
      },
    });
    t.nonNull.list.field("ProductRates", {
      type: "ProductRates",
      args: {
        limit: arg({ type: "Int" }),
      },
      resolve(s, a) {
        return prisma.productRates.findMany({
          orderBy: { id: "desc" },
          where: { product_id: s.id },
          take: a.limit,
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
    t.nonNull.string("rate");
    t.nonNull.id("id");
    t.nonNull.string("description");
    t.nonNull.id("product_id");
    t.nonNull.int("_count", {
      resolve(s) {
        return prisma.productRates.count({
          where: { product_id: s.product_id },
        });
      },
    });
    t.nonNull.id("user_id");
    t.nonNull.field("Users", {
      type: "Users",
      resolve(s) {
        return prisma.users.findUnique({
          where: { id: s.user_id },
        });
      },
    });
  },
});

export const Users = objectType({
  name: "Users",
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