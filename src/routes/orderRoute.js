import { Router } from "express";

const orderRoute = Router();

orderRoute.post("/order");
orderRoute.get("/orders");
orderRoute.get("/orders/:id");

export default orderRoute;