import mongoose from "mongoose";
import HTTP_STATUS from "../constants/http/codes";
import HTTP_MESSAGE from "../constants/http/messages";
import RESPONSE_MESSAGE from "../constants/messages/responseMessages";
import IResponse from "../interfaces/http/responseInterface";
import CartRepository from "../repositories/cartRepository";
import { ICart, ICartParameter } from "../interfaces/cart/cartInterface";
import ProductRepository from "../repositories/productRepository";

class CartService {
  static async addToCart(cartParameter: ICartParameter): Promise<IResponse> {
    //check product
    let product = await ProductRepository.getProductById(
      cartParameter?.productId
    );

    if (!product?.stock) {
      return {
        success: false,
        message: RESPONSE_MESSAGE.UNAVAILABLE_PRODUCT,
        error: {
          error_code: HTTP_STATUS.UNPROCESSABLE_ENTITY,
          error_message: HTTP_MESSAGE.UNPROCESSABLE_ENTITY,
        },
      };
    }

    // find Cart by userId
    let cart = await CartRepository.getCartByUserId(cartParameter?.userId);

    //cart exist so update in cart
    if (cart) {
      const isExistProductInCart = await CartRepository.findProductFromCart(
        cartParameter
      );
      let updateCartResult;
      if (isExistProductInCart) {
        console.log("ewr");
        updateCartResult = await CartRepository.increaseProductCountInCart(
          cartParameter,
          product.price
        );
      } else {
        updateCartResult = await CartRepository.addProductToCart(
          cartParameter,
          product.price
        );
      }

      return {
        success: true,
        message: RESPONSE_MESSAGE.ADDED_TO_CART,
        data: updateCartResult,
      };
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
        total: product?.price,
      };
      const cartCreateResult = await CartRepository.createCart(newCart);
      if (cartCreateResult) {
        return {
          success: true,
          data: cartCreateResult,
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
  }

  static async removeFromCart(
    cartParameter: ICartParameter
  ): Promise<IResponse> {
    //check product
    let product = await ProductRepository.getProductById(
      cartParameter?.productId
    );

    // find Cart by userId
    const isExistProductInCart = await CartRepository.findProductFromCart(
      cartParameter
    );

    // console.log("isExistProductInCart ",isExistProductInCart)

    //check if product exist
    if (isExistProductInCart && product) {
      // console.log("isExistProductInCart ",isExistProductInCart)
      let quantity;
      isExistProductInCart?.productList?.forEach((product) => {
        if (
          product?.productId == cartParameter?.productId &&
          product?.quantity == 1
        ) {
          // console.log("inside ", product?.productId);
          quantity = 1;
        }
      });
      let updateCartResult;
      if (quantity == 1) {
        updateCartResult = await CartRepository.removeProductFromCart(
          cartParameter,
          product.price
        );
      } else {
        updateCartResult = await CartRepository.decreaseProductCountInCart(
          cartParameter,
          product.price
        );
      }

      if (updateCartResult) {
        return {
          success: true,
          message: RESPONSE_MESSAGE.REMOVED_FROM_CART,
          data: updateCartResult,
        };
      } else {
        return {
          success: false,
          message: RESPONSE_MESSAGE.ADDED_TO_CART_FAILED,
        };
      }
    }
    //product is not exist
    else {
      // console.log("not found")
      return {
        success: false,
        error: {
          error_code: HTTP_STATUS.NOT_FOUND,
          error_message: HTTP_MESSAGE.NOT_FOUND,
        },
      };
    }
  }

  static async getCartByUserId(
    userId: mongoose.Types.ObjectId
  ): Promise<IResponse> {
    // find Cart by userId
    // console.log("cart  --- ");
    let cart = await CartRepository.getCartByUserId(userId);

    // console.log("cart ", cart);

    //cart exist
    if (cart) {
      return {
        success: true,
        message: RESPONSE_MESSAGE.FETCH_CART,
        data: cart,
      };
    }
    //cart is not exist
    else {
      return {
        success: false,
        error: {
          error_code: HTTP_STATUS.NOT_FOUND,
          error_message: HTTP_MESSAGE.NOT_FOUND,
        },
      };
    }
  }
}

export default CartService;
