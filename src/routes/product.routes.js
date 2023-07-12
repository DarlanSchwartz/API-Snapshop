import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { deleteProduct, editProduct, newProduct, viewProduct } from "../controllers/userProducts.controller.js";
import validateSchema from "../middlewares/validadeSchema.js";
import { newProductSchema } from "../schemas/product.schemas.js";

const productRouter = Router();

productRouter.post('/adicionar-produto', validateAuth, validateSchema(newProductSchema), newProduct);
productRouter.put('/editar-produto/:id', validateAuth, validateSchema(newProductSchema), editProduct);
productRouter.delete('/remover-produto/:id', validateAuth, deleteProduct);
productRouter.get('/visualizar-produto/:id', viewProduct);

export default productRouter;