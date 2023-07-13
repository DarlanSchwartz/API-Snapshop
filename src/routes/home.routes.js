import { Router } from "express";
import { getAllProducts } from "../controllers/home.controller.js";

const homeRouter = Router();

homeRouter.get('/all-products', getAllProducts);

export default homeRouter;