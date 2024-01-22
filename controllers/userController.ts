import { Request, Response } from "express";
import HTTP_STATUS from "../constants/http/codes";
import HTTP_MESSAGE from "../constants/http/messages";
import RESPONSE_MESSAGE from "../constants/messages/responseMessages";
import { sendResponse } from "../utils/handleResponse";
import CartService from "../services/cartService";
import { validationResult } from "express-validator";

class UserController {
  static async logIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      // let token;

      // const result = await User.login(email, password);
      // if (result.success) {
      //   if (result.data.role === UserRoleEnum.Learner) {
      //     token = generateLearnerToken(result.data.learner._id, email);
      //   } else if (result.data.role === UserRoleEnum.Admin) {
      //     token = generateAdminToken(
      //       result.data.admin._id,
      //       email,
      //       result.data.admin.role
      //     );
      //   } else if (result.data.role === UserRoleEnum.Instructor) {
      //     token = generateInstructorToken(result.data.instructor._id, email);
      //   }

      //   return sendResponse({
      //     res: res,
      //     statusCode: HTTP_STATUS.OK,
      //     message: RESPONSE_MESSAGE.LOGIN_DONE,
      //     result: {
      //       accessToken: token,
      //       authData: result.data,
      //     },
      //   });
      // } else {
      //   return sendResponse({
      //     res: res,
      //     statusCode: result.error.error_code,
      //     message: result.error.error_message,
      //   });
      // }
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

export default UserController;
