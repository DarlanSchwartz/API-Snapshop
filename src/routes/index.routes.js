import { Router } from "express";
import productRouter from "./product.routes.js";
import buyRouter from "./buy.routes.js";

const router = Router();

router.use(productRouter);
router.use(buyRouter);

export default router;
