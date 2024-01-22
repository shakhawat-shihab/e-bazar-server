import HTTP_STATUS from "../constants/http/codes";
import HTTP_MESSAGE from "../constants/http/messages";
import RESPONSE_MESSAGE from "../constants/messages/responseMessages";
import { IAuth } from "../interfaces/auth/authInterface";
import IResponse from "../interfaces/http/responseInterface";
import AuthRepository from "../repositories/authRepository";
import bcrypt from "bcrypt";

class AuthService {
  static async signUp(auth: IAuth): Promise<IResponse> {
    const user = await AuthRepository.findAuthByEmail(auth?.email);

    if (user) {
      return {
        success: false,
        error: {
          error_code: HTTP_STATUS.CONFLICT,
          error_message: RESPONSE_MESSAGE.DUPLICATE_EMAIL,
        },
      };
    }
    const token = await AuthRepository.generateToken();
    //   console.log(token);
    const hashPassword = await bcrypt.hash(auth.password, 10);
    const authCreateResult = await AuthRepository.createAuth({
      ...auth,
      password: hashPassword,
      authToken: token?.authToken,
      authTokenExpire: token?.authTokenExpire,
    });

    return {
      success: true,
      data: {
        _id: authCreateResult?._id,
        email: authCreateResult?.email,
      },
    };
  }

  static async logIn(auth: IAuth): Promise<IResponse> {
    const user = await AuthRepository.findAuthByEmail(auth?.email);

    if (!user) {
      return {
        success: false,
        error: {
          error_code: HTTP_STATUS.NOT_FOUND,
          error_message: HTTP_MESSAGE.NOT_FOUND,
        },
      };
    }

    const isPasswordValid = await bcrypt.compare(
      auth?.password,
      user?.password
    );

    // console.log("isPasswordValid ", isPasswordValid);

    if (!isPasswordValid) {
      return {
        success: false,
        error: {
          error_code: HTTP_STATUS.UNAUTHORIZED,
          error_message: HTTP_MESSAGE.UNAUTHORIZED,
        },
      };
    }

    return {
      success: true,
      data: { _id: user?._id, email: user?.email, userId: user?.userId },
    };
  }
}

export default AuthService;
