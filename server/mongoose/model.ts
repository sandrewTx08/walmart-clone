import { model as _model } from "mongoose";
import { CartSchema } from "./schema";

export const CartModel = _model("cart", CartSchema);
