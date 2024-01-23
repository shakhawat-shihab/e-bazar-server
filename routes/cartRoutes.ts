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

cartRouter.patch(
  "/remove-from-cart",
  cartValidator.addToCartValidator,
  CartController.removeFromCart
);

cartRouter.patch("/view", CartController.getCartByUserId);

export default cartRouter;
