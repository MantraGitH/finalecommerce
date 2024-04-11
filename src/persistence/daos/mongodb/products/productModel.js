import { Schema, model } from "mongoose";

export const productsCollection = "products";

export const productSchema = new Schema({
  product_name: { type: String, required: true },
  product_description: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_stock: { type: Number, required: true },
  product_cathegory: { type: String, required: true },
  product_owner: { type: String, default: "admin" },
});

export const ProductModel = model(productsCollection, productSchema);
