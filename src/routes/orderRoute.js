import { Router } from "express";
import { ordersPost } from "../controller/orders.controllers.js";
import { orderCheck } from "../middlewares/orders.middleware.js";

const orderRoute = Router();

orderRoute.post("/order", orderCheck, ordersPost);
orderRoute.get("/orders");
orderRoute.get("/orders/:id");

export default orderRoute;