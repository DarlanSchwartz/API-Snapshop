import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { getProductsShoppingCart, newBuy, productsBoughtByYou, productsRegisteredByUser, shoppingCart } from "../controllers/buy.controller.js";
import validateSchema from "../middlewares/validadeSchema.js";
import { newBuySchema } from "../schemas/buy.schemas.js";

const buyRouter = Router();

buyRouter.post('/comprar/:id', validateAuth, validateSchema(newBuySchema), newBuy);
buyRouter.post('/carrinho/:id', validateAuth, shoppingCart);
buyRouter.get('/carrinho', validateAuth, getProductsShoppingCart);
buyRouter.get('/minhas-compras', validateAuth, productsBoughtByYou);
buyRouter.get('/meus-produtos', validateAuth, productsRegisteredByUser);

export default buyRouter;