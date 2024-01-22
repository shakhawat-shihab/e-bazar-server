import mongoose from "mongoose";

interface IAuth {
  _id?: mongoose.Types.ObjectId;
  email: string;
  password: string;
  userId?: mongoose.Types.ObjectId;
  authToken?:string;
  authTokenExpire?:number;
}

interface IAuthParameter {
  email: string;
  password: string;
}

export { IAuth, IAuthParameter };
