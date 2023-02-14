import {
  MutationCartUpdateArgs,
  MutationCartDeleteArgs,
  Query,
} from "./graphql-types";
import { graphQLClient } from "./graphql-client";

export class CartAPI {
  constructor(public user_id: string) {}

  cartGet(): Promise<Query> {
    return graphQLClient.request(
      `query Query($user_id: String!) {
        cart(user_id: $user_id) {
          currency_price_subtotal
          currency_price_estimatedtotal 
          quantity
          items {
            currency_price
            price
            quantity
            catalog_id
          }
        }
      }`,
      { user_id: this.user_id }
    );
  }

  cartUpdate(args: Omit<MutationCartUpdateArgs, "user_id">): Promise<Query> {
    return graphQLClient.request(
      `mutation Mutation($catalog_id: Int!, $quantity: Int!, $user_id: String!) {
        cartUpdate(catalog_id: $catalog_id, quantity: $quantity, user_id: $user_id) {
          price
          quantity
          catalog_id
        }
      }`,
      { ...args, user_id: this.user_id }
    );
  }

  cartDelete(args: Omit<MutationCartDeleteArgs, "user_id">): Promise<Query> {
    return graphQLClient.request(
      `mutation Mutation($catalog_id: Int!, $user_id: String!) {
        cartDelete(catalog_id: $catalog_id, user_id: $user_id) {
          price
          quantity
          catalog_id
        }
      }`,
      { ...args, user_id: this.user_id }
    );
  }
}