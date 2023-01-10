import { Router } from "express";
import cakeRoute from "./cakeRoute.js";
import clientRoute from "./clientRoute.js";
import orderRoute from "./orderRoute.js";

const router = Router();

router.use(cakeRoute);
router.use(clientRoute);
router.use(orderRoute);

export default router;