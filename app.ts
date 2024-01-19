import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { sendResponse } from "./utils/handleResponse";
import HTTP_STATUS from "./constants/statusCodes";
import { databaseConnection } from "./config/database";

const express = require("express");
const app = express();
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config("dotenv");

app.use(cors({ origin: "*" }));
app.use(express.json()); // Parses data as JSON
app.use(express.text()); // Parses data as text
app.use(express.urlencoded({ extended: true })); // Parses data as urlencoded

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  //   if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
  //     return sendResponse(
  //       res,
  //       STATUS_CODE.UNPROCESSABLE_ENTITY,
  //       RESPONSE_MESSAGE.INVALID_JSON
  //     );
  //   }
  next();
});

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
