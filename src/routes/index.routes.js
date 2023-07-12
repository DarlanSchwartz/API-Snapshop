import { Router } from "express";
import productRouter from "./product.routes.js";
import accountRouter from "./account.routes.js"

const router = Router();

router.use(accountRouter);
router.use(productRouter);


export default router;
