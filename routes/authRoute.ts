import { Router } from "express";
const express = require("express");
import AuthController from "../controllers/authControler";

const authRouter = Router();

authRouter.post(
  "/log-in",
  AuthController.logIn
);

authRouter.post(
    "/sign-up",
    AuthController.signUp
  );

export default authRouter;
