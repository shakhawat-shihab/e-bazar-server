import mongoose from "mongoose";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  email: string;
  password: string;
  userName: string;
}

interface IUserParameter {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
}

export { IUser, IUserParameter };
