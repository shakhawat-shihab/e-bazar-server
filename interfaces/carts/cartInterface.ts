import mongoose from "mongoose";

interface IProductList {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

interface ICart {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  productList: IProductList[];
}

interface ICartParameter {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
}

export { ICart, ICartParameter, IProductList };
