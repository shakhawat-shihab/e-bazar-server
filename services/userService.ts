import IResponse from "../interfaces/http/responseInterface";
import UserModel from "../models/user";
import UserRepository from "../repositories/userRepository";

class UserService {
  static async findAuthByEmail(email: string): Promise<IResponse> {
    const currentAuth = await UserRepository.findAuthByEmail(email);
    if (currentAuth) {
      return {
        success: true,
        data: currentAuth,
      };
    } else {
      return {
        success: false,
      };
    }
  }
}

export default UserService;
