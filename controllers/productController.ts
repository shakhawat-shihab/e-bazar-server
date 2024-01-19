import { Request, Response } from "express";
import HTTP_STATUS from "../constants/http/codes";
import HTTP_MESSAGE from "../constants/http/messages";
import RESPONSE_MESSAGE from "../constants/messages/responseMessages";
import { sendResponse } from "../utils/handleResponse";
import ProductModel from "../models/products";
import ProductService from "../services/productService";

class ProductController {
  static async getProducts(req: Request, res: Response) {
    try {
      const result = await ProductService.getProducts();

      if (result.success) {
        return sendResponse({
          res: res,
          statusCode: HTTP_STATUS.OK,
          message: RESPONSE_MESSAGE.GET_ALL_PRODUCT,
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
}

export default ProductController;
