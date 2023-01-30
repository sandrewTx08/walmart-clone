import { Schema } from "mongoose";

export const CartSchema = new Schema({
  catalog_id: Number,
  product_id: Number,
  price: Number,
  quantity: Number,
  user_id: String,
  image: String,
  name: String,
});

CartSchema.index({ catalog_id: "asc", user_id: "text" });
