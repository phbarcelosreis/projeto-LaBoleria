import express from "express"
import cors from "cors"
import router from "./routes/route.js"
import dotenv from "dotenv";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running at port: ${PORT}`));