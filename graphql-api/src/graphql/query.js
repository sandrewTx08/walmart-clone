// @ts-check

const nexus = require("nexus");
const prisma = require("../../utils/prisma.js");

const Query = nexus.queryType({
  definition(t) {
    t.list.nonNull.field("storeCatalog", {
      type: "Catalogs",
      args: {
        limit: nexus.nonNull(nexus.arg({ type: "Int" })),
        store_id: nexus.nonNull(nexus.arg({ type: "Int" })),
        department_id: nexus.nonNull(nexus.arg({ type: "Int" })),
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
      resolve(s, a) {
        return prisma.productTypes.findMany();
      },
    });
  },
});

module.exports = Query;
