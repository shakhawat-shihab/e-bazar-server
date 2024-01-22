import { IAuth } from "../interfaces/auth/authInterface";
import { IUser } from "../interfaces/user/userInterface";
import AuthModel from "../models/auth";
import crypto from "crypto";
import UserModel from "../models/user";

class AuthRepository {
  static async findAuthByEmail(email: string): Promise<IAuth | null> {
    return await AuthModel.findOne({ email: email })
      .select("-createdAt -updatedAt -__v")
      .exec();
  }

  static async generateToken() {
    let authToken = crypto.randomBytes(32).toString("hex");
    let authTokenExpire = Date.now() + 2 * 60 * 1000;
    return {authToken:authToken, authTokenExpire:authTokenExpire }
  }

  static async  createAuth(auth:IAuth): Promise<IAuth | null> {
    console.log(auth);
    return await AuthModel.create(auth);
  }
}

export default AuthRepository;
