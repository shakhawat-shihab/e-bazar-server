import { IUser } from "../interfaces/user/userInterface";
import UserModel from "../models/user";

class UserRepository {
  static async findAuthByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email: email })
      .select("-createdAt -updatedAt -__v")
      .exec();
  }
}

export default UserRepository;
