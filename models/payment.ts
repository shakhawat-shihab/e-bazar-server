const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const paymentSchema = mongoose.Schema(
  {
    tran_id: {
      type: String,
      unique: true,
    },
    amount: Number,
    card_type: String,
    store_amount: Number,
    currency: String,
    card_issuer: String,
    card_brand: String,
    status: String,
    tran_date: Date,
  },
  {
    timestamps: true,
  }
);

const PaymentModel = mongoose.model("payment", paymentSchema);

export default PaymentModel;
