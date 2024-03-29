import mongoose, { Schema, Document } from "mongoose";
import { ICart, IProductList } from "../interfaces/cart/cartInterface";

const cartSchema: Schema<ICart> = new mongoose.Schema<ICart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    productList: {
      type: [
        {
          productId: {
            type: mongoose.Types.ObjectId,
            ref: "product",
            required: true,
          },
          quantity: { type: Number, required: true },
        },
      ],
      required: true,
    },

    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model<ICart>("carts", cartSchema);

export default CartModel;
