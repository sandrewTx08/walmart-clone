import { arg, nonNull, objectType } from "nexus";
import prisma from "../prisma";

export const Cart = objectType({
  name: "Carts",
  definition(t) {
    t.nonNull.int("price");
    t.nonNull.int("product_id");
    t.nonNull.int("catalog_id");
    t.nonNull.int("quantity");
    t.nonNull.string("user_id");
    t.nonNull.string("name");
    t.nonNull.string("image");
  },
});

export const Catalogs = objectType({
  name: "Catalogs",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("price");
    t.nonNull.int("totalPages");
    t.nonNull.int("product_id");
    t.nonNull.field("Products", {
      type: "Products",
      resolve(s, a) {
        return prisma.products.findFirst({
          where: { id: s.product_id, brand_id: a.brand_id },
        });
      },
    });
  },
});

export const Departments = objectType({
  name: "Departments",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.int("id");
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
        brand_id: arg({ type: "Int" }),
        price_sort: arg({ type: "OrderBy" }),
        store_id: arg({ type: "Int" }),
        page: arg({ type: "Int" }),
      },
      resolve(s, a) {
        return prisma.catalogs
          .paginate({
            orderBy: { price: a.price_sort },
            limit: a.limit,
            page: a.page,
            where: {
              store_id: a.store_id,
              Products: { department_id: s.id, brand_id: a.brand_id },
            },
          })
          .then(({ result, totalPages }) =>
            result.map((v) => ({ ...v, totalPages }))
          );
      },
    });
  },
});

export const Products = objectType({
  name: "Products",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.int("id");
    t.nonNull.int("brand_id");
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
    t.nonNull.int("id");
    t.nonNull.string("description");
    t.nonNull.int("product_id");
    t.nonNull.int("_count", {
      resolve(s) {
        return prisma.productRates.count({
          where: { product_id: s.product_id },
        });
      },
    });
    t.nonNull.string("user_id");
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
    t.nonNull.string("id");
    t.nonNull.string("first_name");
  },
});

export const Brands = objectType({
  name: "Brands",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
  },
});

export const Stores = objectType({
  name: "Stores",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
  },
});
