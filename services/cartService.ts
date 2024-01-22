import mongoose from "mongoose";
import HTTP_STATUS from "../constants/http/codes";
import HTTP_MESSAGE from "../constants/http/messages";
import RESPONSE_MESSAGE from "../constants/messages/responseMessages";
import IResponse from "../interfaces/http/responseInterface";
import CartRepository from "../repositories/cartRepository";
import { ICart, ICartParameter } from "../interfaces/cart/cartInterface";

class CartService {
  static async addToCart(cartParameter: ICartParameter): Promise<IResponse> {
    //check user

    // find Cart by userId
    let result = await CartRepository.getCartByUserId(cartParameter?.userId);

    //cart exist so update in cart
    if (result) {
      const isExistProduct = await CartRepository.findProductFromCart(
        cartParameter
      );
      if (isExistProduct) {
        CartRepository?.increaseProductCountInCart(cartParameter);
      } else {
        CartRepository?.addProductToCart(cartParameter);
      }
    }

    //cart is not exist create cart
    else {
      const newCart: ICart = {
        userId: cartParameter?.userId,
        productList: [
          {
            productId: cartParameter?.productId,
            quantity: 1,
          },
        ],
      };
      const result = await CartRepository.createCart(newCart);
      if (result) {
        return {
          success: true,
          data: result,
        };
      } else {
        return {
          success: false,
          error: {
            error_code: HTTP_STATUS.UNPROCESSABLE_ENTITY,
            error_message: HTTP_MESSAGE.UNPROCESSABLE_ENTITY,
          },
        };
      }
    }

    return {
      success: true,
      message: RESPONSE_MESSAGE.CART_SUCCESS,
    };
  }
}

export default CartService;
