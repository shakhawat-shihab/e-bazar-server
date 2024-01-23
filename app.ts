import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { sendResponse } from "./utils/handleResponse";
import HTTP_STATUS from "./constants/http/codes";
import { databaseConnection } from "./config/database";
import HTTP_MESSAGE from "./constants/http/messages";
import RESPONSE_MESSAGE from "./constants/messages/responseMessages";
import productRouter from "./routes/productRoutes";
import cartRouter from "./routes/cartRoutes";
import userRouter from "./routes/userRoute";
import authRouter from "./routes/authRoute";
import sslRouter from "./routes/sslRoute";

const express = require("express");
const app = express();
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config("dotenv");

app.use(cors({ origin: "*" }));
app.use(express.json()); // Parses data as JSON
app.use(express.text()); // Parses data as text
app.use(express.urlencoded({ extended: true })); // Parses data as urlencoded

interface customError extends Error {
  status?: number;
}

app.use((err: customError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return sendResponse({
      res: res,
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: RESPONSE_MESSAGE.INVALID_JSON,
    });
  }
  next();
});

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/payment", sslRouter);

app.get("/", async (req: Request, res: Response) => {
  return sendResponse({
    res: res,
    statusCode: HTTP_STATUS.OK,
    message: "Route is working",
  });
});

app.use("*", (req: Request, res: Response) => {
  return sendResponse({
    res: res,
    statusCode: HTTP_STATUS.BAD_REQUEST,
    message: "There is no such route",
  });
});

databaseConnection(() => {
  app.listen(8000, () => {
    let date = new Date();
    console.log(
      `App is running on port 8000 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
    );
  });
});
