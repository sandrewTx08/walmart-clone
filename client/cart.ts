import {
  MutationCartAddArgs,
  MutationCartDeleteArgs,
  Query,
} from "./graphql-types";
import { graphQLClient } from "./graphql-client";

export class CartLocal {
  readonly STORAGE_KEY = "cart";

  constructor() {}

  cartGet(e: Query["cart"]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(e));
  }

  cartUpdate() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
  }

  cartDelete() {}
}

export class CartDatabase {
  constructor(public user_id: string) {}

  cartGet(): Promise<Query> {
    return graphQLClient.request(
      `query Query($user_id: ID!) {
        cart(user_id: $user_id) {
          price
          quantity
          catalog_id
        }
      }`,
      { user_id: this.user_id }
    );
  }

  cartUpdate(args: Omit<MutationCartAddArgs, "user_id">): Promise<Query> {
    return graphQLClient.request(
      `mutation Mutation($catalog_id: Int!, $quantity: Int!, $user_id: ID!) {
        cartAdd(catalog_id: $catalog_id, quantity: $quantity, user_id: $user_id) {
          price
          quantity
        }
      }`,
      { ...args, user_id: this.user_id }
    );
  }

  cartDelete(args: Omit<MutationCartDeleteArgs, "user_id">): Promise<Query> {
    return graphQLClient.request(
      `mutation Mutation($catalog_id: Int!, $quantity: Int!, $user_id: ID!) {
        cartDelete(catalog_id: $catalog_id, quantity: $quantity, user_id: $user_id) {
          price
          quantity
        }
      }`,
      { ...args, user_id: this.user_id }
    );
  }
}
