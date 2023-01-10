import { nonNull, arg, extendType } from "nexus";
import prisma from "../../utils/prisma";

export const department = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("department", {
      type: "ProductTypes",
      args: { department_id: nonNull(arg({ type: "Int" })) },
      resolve({}, a) {
        return prisma.productTypes.findFirst({
          where: { id: a.department_id },
        });
      },
    });
  },
});

export const departments = extendType({
  type: "Query",
  definition(t) {
    t.list.nonNull.field("departments", {
      type: "ProductTypes",
      resolve() {
        return prisma.productTypes.findMany({});
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
        return prisma.catalogs.findUnique({ where: { id: a.catalog_id } });
      },
    });
  },
});
