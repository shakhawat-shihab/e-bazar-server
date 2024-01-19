import mongoose from "mongoose";

interface ICart {
  _id?: mongoose.Types.ObjectId;
  learnerId: mongoose.Types.ObjectId;
  courseList: mongoose.Types.ObjectId[];
}

export default ICart;
