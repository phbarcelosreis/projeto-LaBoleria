import { Router } from "express";
import { checkClient, clientOrdersCheck } from "../middlewares/clients.middlewares.js";
import { getClientOrders, postClients } from "../controller/clients.controllers.js"

const clientRoute = Router();

clientRoute.post("/clients", checkClient, postClients);
clientRoute.get("/clients/:id/orders", clientOrdersCheck, getClientOrders);

export default clientRoute;