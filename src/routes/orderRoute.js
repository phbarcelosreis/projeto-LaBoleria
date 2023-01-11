import { Router } from "express";
import { getOrders, getOrdersById, ordersPost } from "../controller/orders.controllers.js";
import { getOrdersByIdCheck, orderCheck } from "../middlewares/orders.middleware.js";

const orderRoute = Router();

orderRoute.post("/order", orderCheck, ordersPost);
orderRoute.get("/orders", getOrders);
orderRoute.get("/orders/:id", getOrdersByIdCheck, getOrdersById);

export default orderRoute;