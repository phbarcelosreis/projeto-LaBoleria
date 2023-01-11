import connection from "../database/db.js";

export async function ordersPost(req, res) {

    const { clientId, cakeId, quantity, totalPrice } = req.body;

    try {

        await connection.query(
            `
            INSERT INTO
            orders ("clientId", "cakeId", "quantity", "totalPrice")
            VALUES ($1, $2, $3, $4)
            `,
            [clientId, cakeId, quantity, totalPrice]
        );

        return res.sendStatus(201)

    } catch (error) {

        console.log(error);
        return res.sendStatus(500);

    }

}

export async function getOrders(req, res) {

    try {

        const allOrders = await connection.query(
            `SELECT orders.id AS "ordersId", orders."createdAt", orders.quantity, orders."totalPrice",
            cakes.id AS "cakeId", cakes.name AS "cakes", cakes.price, cakes.description, cakes.image,
            clients.id AS "clientId", clients.name AS "clientName", clients.address, clients.phone 
            FROM orders
            JOIN clients ON "clientId" = clients.id
            JOIN cakes ON "cakeId" = cakes.id`

        )

        const orders = allOrders.rows.map((props) => {
            const orderObj = {

                client: {
                    id: props.clientId,
                    name: props.clientName,
                    address: props.address,
                    phone: props.phone,
                },
                cake: {
                    id: props.cakeId,
                    name: props.cakes,
                    price: props.price,
                    description: props.description,
                    image: props.image,
                },
                orderId: props.ordersId,
                createdAt: props.createdAt,
                quantity: props.quantity,
                totalPrice: props.totalPrice,

            }

            return orderObj;

        });

        res.send(orders)


    } catch (error) {

        console.log(error);
        return res.sendStatus(500);

    }

}

export async function getOrdersById(req, res) {

    const cake = res.locals.cake;
    const client = res.locals.client;
    const order = res.locals.order;

    const orderObj = {

        client: {
            id: client.id,
            name: client.name,
            address: client.address,
            phone: client.phone,
        },
        cake: {
            id: cake.id,
            name: cake.name,
            price: cake.price,
            description: cake.description,
            image: cake.image,
        },
        orderId: order.id,
        createdAt: order.createdAt,
        quantity: order.quantity,
        totalPrice: order.totalPrice,

    }

    res.send(orderObj).status(200);

}