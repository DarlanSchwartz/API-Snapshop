import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { newBuy, productsBoughtByYou, productsRegisteredByUser, shoppingCart } from "../controllers/buy.controller.js";
import validateSchema from "../middlewares/validadeSchema.js";
import { newBuySchema } from "../schemas/buy.schemas.js";

const buyRouter = Router();

buyRouter.use(validateAuth);

buyRouter.post('/comprar/:id', validateSchema(newBuySchema), newBuy);
buyRouter.post('/carrinho/:id', shoppingCart);
buyRouter.post('/minhas-compras', productsBoughtByYou)
buyRouter.post('/meus-produtos', productsRegisteredByUser)
export default buyRouter;