import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { signUp, signIn, logout } from "../controllers/account.controller.js";
import validateSchema from "../middlewares/validadeSchema.js";
import { SignInSchema, SignUpSchema } from "../schemas/account.schemas.js";

const accountRouter = Router();

accountRouter.post('/cadastro', validateAuth, validateSchema(SignUpSchema), signUp);
accountRouter.post('/login', validateAuth, validateSchema(SignInSchema), signIn);
accountRouter.post('/logout', validateAuth, logout);

export default accountRouter;