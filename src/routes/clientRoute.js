import { Router } from "express";
import { checkClient } from "../middlewares/clients.middlewares.js";
import { postClients } from "../controller/clients.controllers.js"

const clientRoute = Router();

clientRoute.post("/clients", checkClient, postClients);
clientRoute.get("/clients/:id/orders");

export default clientRoute;