import { Router } from "express";
import { getOrders, ordersPost } from "../controller/orders.controllers.js";
import { orderCheck } from "../middlewares/orders.middleware.js";

const orderRoute = Router();

orderRoute.post("/order", orderCheck, ordersPost);
orderRoute.get("/orders", getOrders);
orderRoute.get("/orders/:id");

export default orderRoute;