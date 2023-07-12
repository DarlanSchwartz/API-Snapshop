import { Router } from "express";
import productRouter from "./product.routes.js";

const router = Router();

router.use(productRouter);

export default router;
