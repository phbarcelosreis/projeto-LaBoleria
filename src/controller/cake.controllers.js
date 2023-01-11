import connection from "../database/db.js";

export async function postCakes(req, res) {
    const { name, price, description, image } = req.body;

    try {

        await connection.query(
            `
            INSERT INTO
            cakes (name, price, description, image)
            VALUES ($1, $2, $3, $4)
            `,
            [name, price, description, image]
        );

        return res.sendStatus(201);

    } catch (error) {

        console.log(error);
        return res.sendStatus(500);

    }
}