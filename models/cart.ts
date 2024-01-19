import mongoose, { Schema, Document } from "mongoose";
import ICart from "../interfaces/carts/cartInterface";

const cartSchema: Schema<ICart> = new mongoose.Schema<ICart>(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "users",
    //   required: true,
    // },
    productList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model<ICart>("carts", cartSchema);

export default CartModel;
