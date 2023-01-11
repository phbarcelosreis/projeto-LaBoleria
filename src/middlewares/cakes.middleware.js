import connection from "../database/db.js";
import { cakesSchema } from "../schema/schema.js"

export async function cakesCheck(req, res, next) {

    const { name, price, description, image } = req.body;

    const validation = cakesSchema.validate({
        name,
        price,
        description,
        image,
    }, { abortEarly: false});

    if (validation.error) {
        return res.status(400).send({
            message: "Validation error",
            detail: validation.error.details.map((e) => e.message).join(', ')
        });
    }

    if (name.length < 2 || price < 0 || typeof price != "number" || typeof description != "string") {
        return res.sendStatus(400);
    }

    const result = await connection.query(
        `
        SELECT id FROM cakes 
        WHERE name=$1
    `,
        [name]
    );
    if (result.rowCount > 0) {
        return res.sendStatus(409);
    }

    next();

}