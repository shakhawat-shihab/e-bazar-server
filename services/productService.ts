import HTTP_STATUS from "../constants/http/codes";
import HTTP_MESSAGE from "../constants/http/messages";
import RESPONSE_MESSAGE from "../constants/messages/responseMessages";
import IResponse from "../interfaces/http/responseInterface";
import { IProduct } from "../interfaces/products/productInterface";
import ProductRepository from "../repositories/productRepository";

class ProductService {
  static async getProducts(): Promise<IResponse> {
    const product = await ProductRepository.getProducts();
    if (!product) {
      return {
        success: false,
        error: {
          error_code: HTTP_STATUS.NOT_FOUND,
          error_message: HTTP_MESSAGE.NOT_FOUND,
        },
      };
    }
    return {
      success: true,
      data: product,
    };
  }
}

export default ProductService;
