import { model } from "mongoose";
import { CartSchema } from "./schema";

export const CartModel = model("cart", CartSchema);
