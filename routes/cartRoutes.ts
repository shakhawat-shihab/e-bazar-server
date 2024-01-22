import { Router } from "express";
const express = require("express");
import CartController from "../controllers/cartController";
import { cartValidator } from "../middleware/cart/cartValidator";

const cartRouter = Router();

cartRouter.patch(
  "/add-to-cart",
  cartValidator.addToCartValidator,
  CartController.addToCart
);

export default cartRouter;
