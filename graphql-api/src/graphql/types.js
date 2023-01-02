// @ts-check

const nexus = require("nexus");
const { argsToPrisma } = require("../helpers/resolver.js");
const prisma = require("../../utils/prisma.js");

module.exports.Catalogs = nexus.objectType({
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

module.exports.ProductTypes = nexus.objectType({
  name: "ProductTypes",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.id("id");
  },
});

module.exports.Products = nexus.objectType({
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

module.exports.ProductRates = nexus.objectType({
  name: "ProductRates",
  definition(t) {
    t.nonNull.string("rate");
    t.nonNull.id("id");
  },
});
