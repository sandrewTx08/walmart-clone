import { nonNull, arg, extendType } from "nexus";
import prisma from "../../utils/prisma";
import { argsToPrisma } from "../helpers/resolver";

export const department = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("department", {
      type: "ProductTypes",
      args: { department_id: nonNull(arg({ type: "Int" })) },
      resolve(s, a) {
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
      resolve(s, a) {
        return prisma.productTypes.findMany({
          select: argsToPrisma(s),
        });
      },
    });
  },
});
