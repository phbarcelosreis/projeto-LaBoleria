import Joi from "joi";

export const cakesSchema = Joi.object({
    name: Joi.string().min(0).required(),
    price: Joi.required(),
    description: Joi.allow("").required(),
    image: Joi.string().uri().required(),
});

export const clientsSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().min(10).max(11).required(),
});

export const ordersSchema = Joi.object({
    clientId: Joi.number().integer().required(),
    cakeId: Joi.number().integer().required(),
    quantity: Joi.number().min(0).max(5).integer().required(),
    totalPrice: Joi.number().min(0).required(),
});

