import connection from "../database/db.js";

export async function postClients(req, res) {
    const { name, address, phone} = req.body;

    try {

        await connection.query(
            `
            INSERT INTO
            clients (name, address, phone)
            VALUES ($1, $2, $3)
            `,
            [name, address, phone]
        );

        return res.sendStatus(201);

    } catch (error) {

        console.log(error);
        return res.sendStatus(500);

    }
}

export async function getClientOrders(req, res){

    const { id } = req.params

    const orders = await connection.query(
        `
        SELECT * FROM orders WHERE "clientId" = $1
        `,
        [ id ]

    )

    res.send(orders.rows)

}