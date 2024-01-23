const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
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
    required: true,
  },
  tran_id: {
    type: String,
    unique: true,
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment",
    // required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

const TransactionModel = mongoose.model("transaction", transactionSchema);

export default TransactionModel;
