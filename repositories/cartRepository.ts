import mongoose from "mongoose";
import CartModel from "../models/cart";
import { ICart, ICartParameter } from "../interfaces/cart/cartInterface";
import { populate } from "dotenv";

class CartRepository {
  static async getCartByUserId(
    userId: mongoose.Types.ObjectId
  ): Promise<ICart | null> {
    return await CartModel.findOne({ userId: userId })
      .populate({ path: "productList.productId", model: "product" })
      .exec();
  }

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

  static async addProductToCart(
    cartData: ICartParameter,
    price: number
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
        $inc: {
          total: price,
        },
      },
      { new: true }
    ).exec();
  }

  static async increaseProductCountInCart(
    cartData: ICartParameter,
    price: number
  ): Promise<ICart | null> {
    return await CartModel.findOneAndUpdate(
      {
        userId: cartData?.userId,
        "productList.productId": cartData?.productId,
      },
      {
        $inc: {
          "productList.$.quantity": 1,
          total: price,
        },
      },
      { new: true }
    ).exec();
  }

  static async decreaseProductCountInCart(
    cartData: ICartParameter,
    price: number
  ): Promise<ICart | null> {
    return await CartModel.findOneAndUpdate(
      {
        userId: cartData?.userId,
        "productList.productId": cartData?.productId,
      },
      {
        $inc: {
          "productList.$.quantity": -1,
          total: -price,
        },
      },
      { new: true }
    ).exec();
  }

  static async removeProductFromCart(
    cartData: ICartParameter,
    price: number
  ): Promise<ICart | null> {
    return await CartModel.findOneAndUpdate(
      { userId: cartData?.userId },
      {
        $pull: {
          productList: {
            productId: cartData?.productId,
          },
        },
        $inc: {
          total: -price,
        },
      },
      { new: true }
    ).exec();
  }
}

export default CartRepository;
