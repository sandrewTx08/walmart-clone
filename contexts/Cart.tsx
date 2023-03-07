import { Cart } from "prisma/prisma-client";
import { createContext, useReducer } from "react";

type Product = { name: string; price: number; id: number };

type State = {
  quantity: number;
  total: number;
  product: {
    [id: number]: Partial<Product & Cart>;
  };
};

type Action = {
  type: "SUM" | "SUB";
  payload: {
    product: Product;
  };
};

export const CartContext = createContext<[State, React.Dispatch<Action>]>(null);

export function CartProvider({
  children,
}: React.PropsWithChildren<{ userId?: number }>) {
  const reducer = useReducer((state: State, action: Action): State => {
    if (!state.product[action.payload.product.id]) {
      state.product[action.payload.product.id] = {
        quantity: 0,
        productId: action.payload.product.id,
        price: action.payload.product.price,
        userId: 0,
      };
    }

    switch (action.type) {
      case "SUB": {
        state.product[action.payload.product.id] = {
          ...state.product[action.payload.product.id],
          quantity: state.product[action.payload.product.id].quantity - 1,
        };
      }

      case "SUM": {
        state.product[action.payload.product.id] = {
          ...state.product[action.payload.product.id],
          quantity: state.product[action.payload.product.id].quantity + 1,
        };
      }

      default: {
        const o = Object.keys(state.product) as unknown as number[];
        state.quantity = o.length;
        state.total = o.reduce(
          (p, c) =>
            p + (state.product[c].quantity || p) * state.product[c].price,
          0
        );
        return state;
      }
    }
  }, Object({ product: {}, total: 0, quantity: 0 }));

  return (
    <CartContext.Provider value={reducer}>{children}</CartContext.Provider>
  );
}

// if (action.payload.quantity <= 0) {
//   prisma.cart.delete({
//     where: {
//       userId_productId: {
//         userId: userId,
//         productId: action.payload.cart.productId,
//       },
//     },
//   });
// } else {
//   prisma.cart.update({
//     data: {
//       productId: action.payload.cart.productId,
//       quantity: action.payload.quantity,
//     },
//     where: {
//       userId_productId: {
//         userId: userId,
//         productId: action.payload.cart.productId,
//       },
//     },
//   });
// }
