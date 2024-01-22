import mongoose from "mongoose";
import CartModel from "../models/cart";
import { ICart, ICartParameter } from "../interfaces/cart/cartInterface";

class CartRepository {
  static async findProductFromCart(
    cartData: ICartParameter
  ): Promise<ICart | null> {
    return await CartModel.findOne({
      userId: cartData?.userId,
      "productList.productId": cartData?.productId,
    });
  }

  static async createCart(cartData: ICart): Promise<ICart | null> {
    return await CartModel.create(cartData);
  }

  static async getCartByUserId(
    userId: mongoose.Types.ObjectId
  ): Promise<ICart | null> {
    return await CartModel.findOne({ userId: userId }).exec();
  }

  static async addProductToCart(
    cartData: ICartParameter
  ): Promise<ICart | null> {
    return await CartModel.findOneAndUpdate(
      { userId: cartData?.userId },
      {
        $push: {
          productList: {
            productId: cartData?.productId,
            quantity: 1,
          },
        },
      }
    ).exec();
  }

  static async increaseProductCountInCart(
    cartData: ICartParameter
  ): Promise<ICart | null> {
    return await CartModel.findOneAndUpdate(
      {
        userId: cartData?.userId,
        "productList.productId": cartData?.productId,
      },
      {
        $inc: {
          "productList.$.quantity": 1,
        },
      }
    ).exec();
  }
}

export default CartRepository;
