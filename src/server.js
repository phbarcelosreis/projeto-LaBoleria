import express from "express"
import cors from "cors"
import router from "./routers/users.routes.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running at port: ${PORT}`));