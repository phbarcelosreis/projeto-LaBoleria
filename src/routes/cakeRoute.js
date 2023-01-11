import { Router } from "express";
import { postCakes } from "../controller/cake.controllers.js";
import { cakesCheck } from "../middlewares/cakes.middleware.js";

const cakeRoute = Router();

cakeRoute.post("/cakes", cakesCheck, postCakes);

export default cakeRoute;