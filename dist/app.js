"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleResponse_1 = require("./utils/handleResponse");
const statusCodes_1 = __importDefault(require("./constants/statusCodes"));
const express = require("express");
const app = express();
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config("dotenv");
app.use(cors({ origin: "*" }));
app.use(express.json()); // Parses data as JSON
app.use(express.text()); // Parses data as text
app.use(express.urlencoded({ extended: true })); // Parses data as urlencoded
app.use((err, req, res, next) => {
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
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, handleResponse_1.sendResponse)({
        res: res,
        statusCode: statusCodes_1.default.OK,
        message: "Route is working",
    });
}));
app.use("*", (req, res) => {
    return (0, handleResponse_1.sendResponse)({
        res: res,
        statusCode: statusCodes_1.default.OK,
        message: "Route is working   ",
    });
});
// databaseConnection(() => {
//   app.listen(8000, () => {
//     let date = new Date();
//     console.log(
//       `App is running on port 8000 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
//     );
//   });
// });
