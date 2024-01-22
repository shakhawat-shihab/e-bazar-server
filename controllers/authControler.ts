import { Request, Response } from "express";
import HTTP_STATUS from "../constants/http/codes";
import HTTP_MESSAGE from "../constants/http/messages";
import RESPONSE_MESSAGE from "../constants/messages/responseMessages";
import { sendResponse } from "../utils/handleResponse";
import CartService from "../services/cartService";
import { validationResult } from "express-validator";
import UserService from "../services/userService";
import AuthService from "../services/authService";
import { generateToken } from "../utils/handleToken";

class AuthController {
  static async logIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      let token;

      const logInresult = await AuthService.logIn({ email, password });

      if (logInresult.success) {
        const token = generateToken(logInresult?.data);
        return sendResponse({
          res: res,
          statusCode: HTTP_STATUS.OK,
          message: RESPONSE_MESSAGE.LOGIN_DONE,
          result: {
            token: token,
            authData: logInresult.data,
          },
        });
      } else {
        return sendResponse({
          res: res,
          statusCode: logInresult.error.error_code,
          message: logInresult.error.error_message,
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

  static async signUp(req: Request, res: Response) {
    try {
      const { email, password, userName } = req.body;

      //create user
      const user = await UserService.createUser(email, userName);

      // console.log("user ",user?.data?._id);

      const result = await AuthService.signUp({
        email,
        password,
        userId: user?.data?._id,
      });
      if (result.success) {
        return sendResponse({
          res: res,
          statusCode: HTTP_STATUS.CREATED,
          message: RESPONSE_MESSAGE.SIGNUP_DONE,
          result: result.data,
        });
      } else if (result.error) {
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

export default AuthController;
