import connection from "../database/db.js";

export async function ordersPost(req, res) {

    const { clientId, cakeId, quantity, totalPrice } = req.body;
    const createdAt = new Date().toISOString().slice(0, 16).replace("T", " ");

    try {

        await connection.query(
            `
            INSERT INTO
            orders ("clientId", "cakeId", "quantity", "totalPrice", "createdAt")
            VALUES ($1, $2, $3, $4, $5)
            `,
            [clientId, cakeId, quantity, totalPrice, createdAt]
        );

        return res.sendStatus(201)

    } catch (error) {

        console.log(error);
        return res.sendStatus(500);

    }

}

export async function getOrders(req, res) {

    const { date } = req.query;

    try {

        if (date) {

            const ordersDate = await connection.query(

                `
                SELECT orders.*,
                orders.id AS "ordersId",
                clients.id AS "clientId",
                clients.name AS "clientName",
                clients.address AS "clientAddress",
                clients.phone AS "clientPhone",
                cakes.id AS "cakeId",
                cakes.name AS "cakes",     
                cakes.price AS "cakePrice",
                cakes.image AS "cakeImage",
                cakes.description AS "cakeDescription"
                FROM orders
                JOIN clients ON "clientId" = clients.id
                JOIN cakes ON "cakeId" = cakes.id
                WHERE "createdAt" = $1
                `,
                [`${date}`]

            )

            console.log(ordersDate)

            const ordersFilter = ordersDate.rows.map((props) => {
                const orderObj = {

                    client: {
                        id: props.clientId,
                        name: props.clientName,
                        address: props.clientAddress,
                        phone: props.clientPhone,
                    },
                    cake: {
                        id: props.cakeId,
                        name: props.cakes,
                        price: props.cakePrice,
                        description: props.description,
                        image: props.cakeImage,
                    },
                    orderId: props.ordersId,
                    createdAt: props.createdAt,
                    quantity: props.quantity,
                    totalPrice: props.totalPrice,

                }

                return orderObj;

            });

            return res.send(ordersFilter).status(200)

        }

        const allOrders = await connection.query(
            `
            SELECT orders.*,
            orders.id AS "ordersId",
            clients.id AS "clientId",
            clients.name AS "clientName",
            clients.address AS "clientAddress",
            clients.phone AS "clientPhone",
            cakes.id AS "cakeId",
            cakes.name AS "cakes",     
            cakes.price AS "cakePrice",
            cakes.image AS "cakeImage",
            cakes.description AS "cakeDescription"
            FROM orders
            JOIN clients ON "clientId" = clients.id
            JOIN cakes ON "cakeId" = cakes.id
            `

        )

        const orders = allOrders.rows.map((props) => {
            const orderObj = {

                client: {
                    id: props.clientId,
                    name: props.clientName,
                    address: props.clientAddress,
                    phone: props.clientPhone,
                },
                cake: {
                    id: props.cakeId,
                    name: props.cakes,
                    price: props.cakePrice,
                    description: props.description,
                    image: props.cakeImage,
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