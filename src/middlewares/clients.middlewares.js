import { clientsSchema } from "../schema/schema.js";

export async function checkClient(req, res, next) {

    const { name, address, phone } = req.body;

    const validation = clientsSchema.validate({
        name,
        address,
        phone
    }, { abortEarly: false });

    if (validation.error) {
        return res.status(400).send({
            message: "Validation error",
            detail: validation.error.details.map((e) => e.message).join(', ')
        });
    }

    next();

}