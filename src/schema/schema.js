import Joi from "joi";

export const cakesSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().required(),
    description: Joi.string().min(1).required(),
    image: Joi.string().uri().required(),
});

export const clientsSchema = Joi.object({
    name: Joi.string().min(2).required(),
    address: Joi.string().min(2).required(),
    phone: Joi.string().min(10).max(11).required(),
});

export const ordersSchema = Joi.object({
    clientId: Joi.number().integer().required(),
    cakeId: Joi.number().integer().required(),
    quantity: Joi.number().min(1).max(5).integer().required()
});

