import Joi from "joi";

export const newBuySchema = Joi.object({
   amount: Joi.number().positive().required()
});
