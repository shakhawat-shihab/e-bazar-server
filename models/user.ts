import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interfaces/user/userInterface";

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>("users", userSchema);

export default UserModel;
