import connection from "../database/db.js";

export async function ordersPost(req, res) {

    const { cakeId, quantity } = req.body;

    try {

        const price = await connection.query(
            `SELECT * FROM cakes WHERE id = $1`, [cakeId]
        )

        const newPrice = price.rows[0].price * quantity

        console.log(newPrice)
    
        return res.sendStatus(200)

    } catch (error) {

        console.log(error);
        return res.sendStatus(500);

    }

}