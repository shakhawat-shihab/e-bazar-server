import { Router } from "express";
const express = require("express");
import CartController from "../controllers/cartController";
import { cartValidator } from "../middleware/cart/cartValidator";

const userRouter = Router();

userRouter.post(
  "/log-in",
  cartValidator.addToCartValidator,
  CartController.addToCart
);

export default userRouter;
