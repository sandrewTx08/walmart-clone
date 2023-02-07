import prisma from "../prisma";
import { arg, extendType, nonNull } from "nexus";
import { CartModel } from "../mongoose/model";

export const Cart = extendType({
  type: "Mutation",
  definition(t) {
    t.field("cartUpdate", {
      type: "Carts",
      args: {
        user_id: nonNull(arg({ type: "String" })),
        catalog_id: nonNull(arg({ type: "Int" })),
        quantity: nonNull(arg({ type: "Int" })),
      },
      async resolve({}, a) {
        const catalogProduct = await prisma.catalogs.findUnique({
          include: { Products: true },
          where: { id: a.catalog_id },
        });

        return await CartModel.findOneAndReplace(
          { user_id: a.user_id, catalog_id: a.catalog_id },
          {
            image: catalogProduct?.Products.image,
            name: catalogProduct?.Products.name,
            price: catalogProduct?.price,
            product_id: catalogProduct?.Products.id,
            catalog_id: a.catalog_id,
            quantity: a.quantity,
            user_id: a.user_id,
          },
          { upsert: true }
        );
      },
    });

    t.field("cartDelete", {
      type: "Carts",
      args: {
        user_id: nonNull(arg({ type: "String" })),
        catalog_id: nonNull(arg({ type: "Int" })),
      },
      resolve(s, a) {
        return CartModel.findOneAndRemove({
          user_id: a.user_id,
          catalog_id: a.catalog_id,
        });
      },
    });
  },
});
