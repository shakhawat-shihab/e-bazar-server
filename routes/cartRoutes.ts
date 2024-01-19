import { Router } from "express";
import CartController from "../controllers/cartController";

const productRouter = Router();

productRouter.patch("/add-to-cart", CartController.addToCart);

export default productRouter;
