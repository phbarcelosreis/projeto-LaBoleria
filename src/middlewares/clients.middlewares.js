import connection from "../database/db.js";
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

export async function clientOrdersCheck(req, res, next){

    const { id } = req.params;

    const checkOrderExist = await connection.query(
        `
        SELECT * FROM orders WHERE "clientId" = $1
        `,
        [ id ]
    )

    if(checkOrderExist.rowCount === 0){
        return res.sendStatus(404)
    }

    next()

}