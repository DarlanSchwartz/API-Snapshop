import { Router } from "express";
import productRouter from "./product.routes.js";
import accountRouter from "./account.routes.js"
import buyRouter from "./buy.routes.js";

const router = Router();

router.use(accountRouter);
router.use(productRouter);
router.use(buyRouter);


export default router;
