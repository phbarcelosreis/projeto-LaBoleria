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

    const existClientId = await connection.query(
        'SELECT * FROM clients WHERE id = $1', [clientId]
    );

    const existCakeId = await connection.query(
        'SELECT * FROM cakes WHERE id = $1', [cakeId]
    );

    if (existCakeId.rowCount === 0 || existClientId.rowCount === 0) {
        return res.sendStatus(404);
    }

    console.log(existCakeId)

    next();

}

export async function getOrdersByIdCheck(req, res, next) {

    const { id } = req.params;

    const orderById = await connection.query(

        `
        SELECT * FROM orders WHERE id = $1
        `,
        [id]

    )

    if (orderById.rowCount === 0) {
        return res.sendStatus(404);
    }

    const cakeById = await connection.query(

        `
        SELECT * FROM cakes WHERE id = $1
        `,
        [orderById.rows[0].cakeId]

    )

    const clientById = await connection.query(

        `
        SELECT * FROM clients WHERE id = $1
        `,
        [orderById.rows[0].clientId]

    )

    const cake = cakeById.rows[0]
    const client = clientById.rows[0]
    const order = orderById.rows[0]

    res.locals.cake = cake
    res.locals.client = client
    res.locals.order = order

    next()

}