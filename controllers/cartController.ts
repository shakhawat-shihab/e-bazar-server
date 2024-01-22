import { Request, Response } from "express";
import HTTP_STATUS from "../constants/http/codes";
import HTTP_MESSAGE from "../constants/http/messages";
import RESPONSE_MESSAGE from "../constants/messages/responseMessages";
import { sendResponse } from "../utils/handleResponse";
import CartService from "../services/cartService";
import { validationResult } from "express-validator";

class CartController {
  static async addToCart(req: Request, res: Response) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return sendResponse({
          res: res,
          statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
          message: HTTP_MESSAGE.UNPROCESSABLE_ENTITY,
          result: validation,
        });
      }

      const { productId, userId } = req.body;

      const result = await CartService.addToCart({
        productId: productId,
        userId: userId,
      });

      if (result.success) {
        return sendResponse({
          res: res,
          statusCode: HTTP_STATUS.OK,
          message: RESPONSE_MESSAGE.ADDED_TO_CART,
          result: result.data,
        });
      } else {
        return sendResponse({
          res: res,
          statusCode: result.error.error_code,
          message: result.error.error_message,
        });
      }
    } catch (error) {
      console.log(error);
      return sendResponse({
        res: res,
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: HTTP_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  }

  static async removeFromCart(req: Request, res: Response) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return sendResponse({
          res: res,
          statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
          message: HTTP_MESSAGE.UNPROCESSABLE_ENTITY,
          result: validation,
        });
      }

      const { productId, userId } = req.body;

      const result = await CartService.removeFromCart({
        productId: productId,
        userId: userId,
      });

      // console.log(result)

      if (result.success) {
        return sendResponse({
          res: res,
          statusCode: HTTP_STATUS.OK,
          message: RESPONSE_MESSAGE.REMOVED_FROM_CART,
          result: result.data,
        });
      } else {
        return sendResponse({
          res: res,
          statusCode: result.error.error_code,
          message: result.error.error_message,
        });
      }
    } catch (error) {
      // console.log(error);
      return sendResponse({
        res: res,
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: HTTP_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  }

  static async getCartByUserId(req: Request, res: Response) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return sendResponse({
          res: res,
          statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
          message: HTTP_MESSAGE.UNPROCESSABLE_ENTITY,
          result: validation,
        });
      }

      const { userId } = req.body;

      const result = await CartService.getCartByUserId(userId);

      if (result.success) {
        return sendResponse({
          res: res,
          statusCode: HTTP_STATUS.OK,
          message: RESPONSE_MESSAGE.REMOVED_FROM_CART,
          result: result.data,
        });
      } else {
        return sendResponse({
          res: res,
          statusCode: result.error.error_code,
          message: result.error.error_message,
        });
      }
    } catch (error) {
      // console.log(error);
      return sendResponse({
        res: res,
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: HTTP_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default CartController;
