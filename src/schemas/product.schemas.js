import joi from 'joi';

export const newProductSchema = joi.object({
    name: joi.string().required(),
    value: joi.number().positive().required(),
    description: joi.string().required(),
    available: joi.boolean().required(),
    stock: joi.number().required(),
    category: joi.string().required(),
    picture: joi.string().required(),
});