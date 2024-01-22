import mongoose from "mongoose";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  email: string;
  userName: string;
  phone: string;
}



export { IUser };
