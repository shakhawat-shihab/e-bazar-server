import { IProduct } from "../interfaces/products/productInterface";
import ProductModel from "../models/products";

class ProductRepository {
  static async getProducts(): Promise<IProduct[] | null> {
    return await ProductModel.find().exec();
  }
}

export default ProductRepository;
