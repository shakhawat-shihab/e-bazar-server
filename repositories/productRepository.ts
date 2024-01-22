import mongoose from "mongoose";
import { IProduct } from "../interfaces/products/productInterface";
import ProductModel from "../models/products";

class ProductRepository {
  static async getProducts(): Promise<IProduct[] | null> {
    return await ProductModel.find({}).exec();
  }

  static async getProductById(
    _id: mongoose.Types.ObjectId
  ): Promise<IProduct | null> {
    return await ProductModel.findOne({ _id: _id }).exec();
  }
}

export default ProductRepository;
