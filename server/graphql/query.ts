import { nonNull, arg, extendType } from "nexus";
import { formatCurrency } from "../currency";
import { CartModel } from "../mongoose/model";
import prisma from "../prisma";

export const department = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("department", {
      type: "Departments",
      args: {
        department_id: nonNull(arg({ type: "Int" })),
      },
      resolve({}, a) {
        return prisma.departments.findUnique({
          where: { id: a.department_id },
        });
      },
    });
  },
});

export const stores = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("stores", {
      type: "Stores",
      resolve() {
        return prisma.stores.findMany();
      },
    });
  },
});

export const departments = extendType({
  type: "Query",
  definition(t) {
    t.list.nonNull.field("departments", {
      type: "Departments",
      resolve() {
        return prisma.departments.findMany();
      },
    });
  },
});

export const productBrands = extendType({
  type: "Query",
  definition(t) {
    t.list.nonNull.field("productBrands", {
      type: "Brands",
      args: { department_id: nonNull(arg({ type: "Int" })) },
      resolve({}, a) {
        return prisma.brands.findMany({
          where: {
            Products: {
              some: { department_id: a.department_id },
            },
          },
        });
      },
    });
  },
});

export const catalog = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("catalog", {
      type: "Catalogs",
      args: { catalog_id: nonNull(arg({ type: "Int" })) },
      resolve({}, a) {
        return prisma.catalogs
          .findUnique({ where: { id: a.catalog_id } })
          .then((v) => ({
            ...v,
            currency_price: v && formatCurrency["USD"](v.price.toNumber()),
          }));
      },
    });
  },
});

export const cart = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("cart", {
      type: "Carts",
      args: { user_id: nonNull(arg({ type: "String" })) },
      resolve({}, a) {
        return CartModel.find({ user_id: a.user_id }).then((x) =>
          x.map((y) => ({
            ...y.toJSON(),
            currency_price: y.price && formatCurrency["USD"](Number(y.price)),
          }))
        );
      },
    });
  },
});
