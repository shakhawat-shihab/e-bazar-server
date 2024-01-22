import HTTP_STATUS from "../constants/http/codes";
import HTTP_MESSAGE from "../constants/http/messages";
import RESPONSE_MESSAGE from "../constants/messages/responseMessages";
import IResponse from "../interfaces/http/responseInterface";
import UserModel from "../models/user";
import UserRepository from "../repositories/userRepository";

class UserService {
  static async findUserByEmail(email: string): Promise<IResponse> {
    const user = await UserRepository.findUserByEmail(email);
    if (user) {
      return {
        success: true,
        data: user,
      };
    } else {
      return {
        success: false,
      };
    }
  }


  static async createUser(email: string, userName:string): Promise<IResponse> {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      const createResult=await UserRepository.createUser(email, userName);
     
      if(createResult){
        return {
          success: true,
          message: RESPONSE_MESSAGE.USER_CREATED,
          data: createResult,
        };
      }
      else{
        return {
          success: false,
          error: {
            error_code: HTTP_STATUS.UNPROCESSABLE_ENTITY,
            error_message: HTTP_MESSAGE.UNPROCESSABLE_ENTITY,
          },
        };
      }
      
    } else {
      return {
        success: false,
        error: {
          error_code: HTTP_STATUS.CONFLICT,
          error_message: HTTP_MESSAGE.CONFLICT,
        },
      };
    }
  }


}

export default UserService;
