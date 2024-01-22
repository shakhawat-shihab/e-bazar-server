import { IUser } from "../interfaces/user/userInterface";
import UserModel from "../models/user";

class UserRepository {
  static async findUserByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email: email })
      .select("-createdAt -updatedAt -__v")
      .exec();
  }

  static async createUser(email: string, userName:string): Promise<IUser | null> {
    return await UserModel.create({ email: email, userName:userName })
  }


}

export default UserRepository;
