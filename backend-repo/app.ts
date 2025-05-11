import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { DEFAULT_PORT } from "./constants";
import { appRoutes } from "./routes";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const PORT = DEFAULT_PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(appRoutes);

app.listen(PORT, () => console.log(`Running at port ${PORT}`));
