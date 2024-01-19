import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/products/productInterface";

const productSchema: Schema<IProduct> = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: [true, "Title must be provided"],
    maxLength: 30,
  },
  description: {
    type: String,
    required: [true, "Description must be provided"],
    maxLength: 60,
  },
  price: {
    type: Number,
    required: [true, "Price must be provided"],
  },
  discountPercentage: Number,
  rating: Number,
  stock: {
    type: Number,
    required: [true, "Stock must be provided"],
  },
  brand: {
    type: String,
    required: [true, "Brand must be provided"],
    maxLength: 60,
  },
  category: String,
  thumbnail: {
    type: String,
    required: [true, "Thumbnail must be provided"],
  },
  images: [String],
});

const ProductModel = mongoose.model<IProduct>("product", productSchema);

export default ProductModel;
