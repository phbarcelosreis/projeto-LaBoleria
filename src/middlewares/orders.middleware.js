import connection from "../database/db.js";
import { ordersSchema } from "../schema/schema.js";

export async function orderCheck(req, res, next) {

    const { clientId, cakeId, quantity } = req.body;

    const validation = ordersSchema.validate({
        clientId,
        cakeId,
        quantity
    })

    if (validation.error) {
        return res.status(400).send({
            message: "Validation error",
            detail: validation.error.details.map((e) => e.message).join(', ')
        });
    }


    try {

        const existClientId = await connection.query(
            'SELECT * FROM clients WHERE id = $1', [clientId]
        );

        const existCakeId = await connection.query(
            'SELECT * FROM cakes WHERE id = $1', [cakeId]
        );

        if (existCakeId.rowCount === 0 || existClientId.rowCount === 0) {
            return res.sendStatus(404);
        }

        next();

    } catch(err){

        console.log(err);
        return res.sendStatus(500);

    }
   
}