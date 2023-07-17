import { Router } from "express";
import { getAllProducts, getAmountOfProducst } from "../controllers/home.controller.js";

const homeRouter = Router();

homeRouter.get('/all-products', getAllProducts);
homeRouter.get('/amount-of-products', getAmountOfProducst);

export default homeRouter;