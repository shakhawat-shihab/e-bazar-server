import { Router } from "express";
const express = require("express");

import { cartValidator } from "../middleware/cart/cartValidator";
import UserController from "../controllers/userController";

const userRouter = Router();

userRouter.post(
  "/log-in",
  cartValidator.addToCartValidator,
  UserController.logIn
);

export default userRouter;
