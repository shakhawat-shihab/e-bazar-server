import mongoose, { Schema, Document } from "mongoose";
import { IAuth } from "../interfaces/auth/authInterface";

const authSchema: Schema<IAuth> = new mongoose.Schema<IAuth>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref:"user",
      required:true
    },
    authToken:{
        type: String,
      },
      authTokenExpire:{
        type: Number,
      },

  },
  {
    timestamps: true,
  }
);

const AuthModel = mongoose.model<IAuth>("auth", authSchema);

export default AuthModel;
