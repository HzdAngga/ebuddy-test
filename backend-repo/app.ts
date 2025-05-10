import express from "express";
// import router from './routes';
import cors from "cors";
// import errorHandler from './middlewares/errorHandler'
import dotenv from "dotenv";
import { DEFAULT_PORT } from "./constants";

if (process.env.NODE_ENV !== "production") {
  const env = dotenv.config();
}

const app = express();
const PORT = DEFAULT_PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(router)
// app.use(errorHandler)

app.listen(PORT, () => console.log(`Running at port ${PORT}`));
