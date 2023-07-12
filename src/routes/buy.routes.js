import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { newBuy } from "../controllers/buy.controller.js";
import validateSchema from "../middlewares/validadeSchema.js";
import { newBuySchema } from "../schemas/buy.schemas.js";

const buyRouter = Router();

buyRouter.use(validateAuth);

buyRouter.post('/buy/:id', validateSchema(newBuySchema), newBuy);

export default buyRouter;