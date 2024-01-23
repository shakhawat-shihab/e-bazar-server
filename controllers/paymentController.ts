const { v4: uuidv4 } = require("uuid");
const SSLCommerzPayment = require("sslcommerz-lts");
// const CourseApplication = require("../models/CourseApplication");
// const Payment = require("../models/Payment");

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;

import { Request, Response } from "express";
import CartRepository from "../repositories/cartRepository";
import HTTP_STATUS from "../constants/http/codes";
import HTTP_MESSAGE from "../constants/http/messages";
import TransactionModel from "../models/transaction";
import PaymentModel from "../models/payment";
import CartModel from "../models/cart";

class PaymentController {
  static initializeSSL = async (req: Request, res: Response) => {
    console.log("hitting ssl initialize ", store_id, store_passwd, req.body);
    const { userId } = req.body;

    const cart = await CartRepository.getCartByUserId(userId);

    if (!cart) {
      return {
        success: false,
        error: {
          error_code: HTTP_STATUS.NOT_FOUND,
          error_message: HTTP_MESSAGE.NOT_FOUND,
        },
      };
    }

    const tran_id = uuidv4();

    const productInfo = {
      total_amount: cart?.total,
      currency: "BDT",
      tran_id: tran_id, // use unique tran_id for each api call
      success_url: `${process.env.backEnd}/api/payment/success`,
      fail_url: `${process.env.backEnd}/api/payment/fail`,
      cancel_url: `${process.env.backEnd}/api/payment/cancel`,
      ipn_url: `${process.env.backEnd}/api/payment/ipn`,
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: "Customer Name",
      cus_email: "customer@example.com",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    // console.log("ewrw  2 ");

    // save transaction id to the application
    const trans = await TransactionModel.create({
      userId: cart?.userId,
      productList: cart?.productList,
      tran_id: tran_id,
      total: cart?.total,
    });
    // console.log("trans ", trans);

    const sslcommer = new SSLCommerzPayment(store_id, store_passwd, false); //true for live default false for sandbox
    sslcommer.init(productInfo).then((data: any) => {
      //process the response that got from sslcommerz
      //https://developer.sslcommerz.com/doc/v4/#returned-parameters
      const info = { ...productInfo, ...data, userId: userId };

      // console.log('info.GatewayPageURL ', info.GatewayPageURL);
      // console.log('info.GatewayPageURL ', data);
      if (info.GatewayPageURL) {
        res.json(info.GatewayPageURL);
      } else {
        // console.log('else part')
        return res.status(400).json({
          message: "SSL session was not successful",
        });
      }
    });
  };

  static successSSL = async (req: Request, res: Response) => {
    const payment = await PaymentModel.create(req.body);

    const updateTransaction = await TransactionModel.findOneAndUpdate(
      { tran_id: req?.body?.tran_id },
      { $set: { isPaid: true, paymentId: payment?._id } }
    );

    const cart = await CartModel.updateOne(
      { userId: updateTransaction.userId },
      { $set: { productList: [], total: 0 } }
    );

    res.writeHead(302, { Location: `${process.env.frontEnd}/payment-success` });

    res.end();
  };

  static failureSSL = async (req: Request, res: Response) => {
    console.log("failure");
    return res.redirect(`${process.env.frontEnd}/payment-failed`);
  };

  static cancelSSL = async (req: Request, res: Response) => {
    // const result = await orderCollection.deleteOne({ tran_id: req.body.tran_id })
    // res.redirect(`${process.env.frontEnd}`)
    console.log("cancel");
    res.redirect(`${process.env.frontEnd}/`);
    // res.status(400).json({
    //     message: "SSL cancel"
    // })
  };

  static ipnSSL = async (req: Request, res: Response) => {
    // console.log(req.body)
    // res.send(req.body);
    console.log("ipn");
    res.redirect(`${process.env.frontEnd}/`);
    // res.status(400).json({
    //     message: "SSL ipn"
    // })
  };

  static validateSSL = async (req: Request, res: Response) => {
    // const result = await orderCollection.findOne({
    //     tran_id: req.body.tran_id
    // })
    // if (result.val_id === req.body.val_id) {
    //     const update = await orderCollection.updateOne({ tran_id: req.body.tran_id }, {
    //         $set: {
    //             paymentStatus: 'paymentComplete'
    //         }
    //     })
    //     console.log(update);
    //     res.send(update.modifiedCount > 0)
    // }
    // else {
    //     res.send("Chor detected")
    // }
    res.status(400).json({
      message: "SSL validate",
    });
  };
}

export default PaymentController;
