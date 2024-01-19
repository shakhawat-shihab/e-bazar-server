import { Router } from "express";
import ProductController from "../controllers/productController";

const productRouter = Router();

productRouter.get("/all", ProductController.getProducts);

export default productRouter;
