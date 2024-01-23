const express = require("express");
const sslRouter = express.Router();
import paymentController from "../controllers/paymentController";

sslRouter.post("/ssl-init", paymentController?.initializeSSL);
sslRouter.post("/success", paymentController?.successSSL);
sslRouter.post("/failure", paymentController?.failureSSL);
sslRouter.post("/cancel", paymentController.cancelSSL);
sslRouter.post("/ipn", paymentController.ipnSSL);
sslRouter.post("/validate", paymentController.validateSSL);

export default sslRouter;
