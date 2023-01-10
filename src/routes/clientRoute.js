import { Router } from "express";

const clientRoute = Router();

clientRoute.post("/clients");
clientRoute.get("/clients/:id/orders");

export default clientRoute;