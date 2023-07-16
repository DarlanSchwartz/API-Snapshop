import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { deleteCart, deleteProductByCart, getProductsShoppingCart, newBuy, productsBoughtByYou, productsRegisteredByUser, shoppingCart } from "../controllers/buy.controller.js";
import validateSchema from "../middlewares/validadeSchema.js";
import { newBuySchema } from "../schemas/buy.schemas.js";
import { sendEmail } from "../middlewares/sendEmail.js";

const buyRouter = Router();

buyRouter.post('/comprar', validateAuth, validateSchema(newBuySchema), newBuy, sendEmail);
buyRouter.post('/carrinho/:id', validateAuth, shoppingCart);
buyRouter.get('/carrinho', validateAuth, getProductsShoppingCart);
buyRouter.delete('/carrinho/:id', validateAuth, deleteProductByCart);
buyRouter.delete('/limpar-carrinho', validateAuth, deleteCart);
buyRouter.get('/minhas-compras', validateAuth, productsBoughtByYou);
buyRouter.get('/meus-produtos', validateAuth, productsRegisteredByUser);

export default buyRouter;