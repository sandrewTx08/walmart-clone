import { queryType, nonNull, arg } from "nexus";
import prisma from "../../utils/prisma";

const Query = queryType({
  definition(t) {
    t.list.nonNull.field("storeCatalog", {
      type: "Catalogs",
      args: {
        limit: nonNull(arg({ type: "Int" })),
        store_id: nonNull(arg({ type: "Int" })),
        department_id: nonNull(arg({ type: "Int" })),
      },
      resolve(s, a) {
        return prisma.catalogs.findMany({
          orderBy: { id: "desc" },
          take: a.limit,
          where: {
            store_id: a.store_id,
            Products: { product_type_id: a.department_id },
          },
        });
      },
    });

    t.list.nonNull.field("departments", {
      type: "ProductTypes",
      args: { id: arg({ type: "Int" }) },
      resolve(s, a) {
        return prisma.productTypes.findMany(a.id && { where: { id: a.id } });
      },
    });
  },
});

export default Query;
