// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prismaClient from "@/utils/prismaClient";
import { createYoga, createSchema } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = { api: { bodyParser: false } };

interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: typeof prismaClient;
}

const schema = createSchema<Context>({
  typeDefs: /* GraphQL */ `
    type Departments {
      id: Int!
      name: String!
    }

    type Brands {
      id: Int!
      name: String!
    }

    type Cart {
      quantity: Int!
      userId: Int!
      productId: Int!
    }

    type Users {
      id: Int!
      email: String!
      firstName: String!
      lastName: String!
      Cart: [Cart!]!
    }

    type Products {
      id: Int!
      name: String!
      price: Float!
      brandId: Int!
      departmentId: Int!
    }

    type Query {
      departments(id: Int): [Departments!]!
      products(departmentId: Int): [Products!]!
      cartUpdate(quantity: Int!, userId: Int!, productId: Int!): Boolean!
    }
  `,
  resolvers: {
    Query: {
      departments(p, a, { prisma }) {
        return prisma.departments.findMany();
      },
      products(p, a, { prisma }) {
        return prisma.products.findMany({
          where: { departmentId: a.departmentId },
        });
      },
      cartUpdate(p, a, { prisma }) {
        const userId = 0;

        if (a.quantity <= 0) {
          prisma.cart.delete({
            where: {
              userId_productId: {
                userId: userId,
                productId: a.productId,
              },
            },
          });
        } else {
          prisma.cart.update({
            data: {
              productId: a.productId,
              quantity: a.quantity,
            },
            where: {
              userId_productId: {
                userId: userId,
                productId: a.productId,
              },
            },
          });
        }
      },
    },
  },
});

export default createYoga<Context>({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
  context: { prisma: prismaClient },
});
