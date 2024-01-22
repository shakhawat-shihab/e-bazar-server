import mongoose from "mongoose";
import CartModel from "../models/cart";
import { ICart } from "../interfaces/carts/cartInterface";

class CartRepository {
  //   static async addToCart(
  //     productId: mongoose.Types.ObjectId,
  //     userId: mongoose.Types.ObjectId
  //   ): Promise<IProduct[] | null> {
  //     return await CartModel.find().exec();
  //   }

  static async createCart(cartData: ICart): Promise<ICart> {
    return await CartModel.create(cartData);
  }

  static async getCartByUserId(
    userId: mongoose.Types.ObjectId
  ): Promise<ICart | null> {
    return await CartModel.findOne({ userId: userId }).exec();
  }
}

export default CartRepository;
