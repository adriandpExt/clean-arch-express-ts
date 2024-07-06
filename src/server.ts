import express from "express";

import cors from "cors";
import bodyParser from "body-parser";
import connectionString from "./db/connection";

import todoRouter from "./routes/todoRoutes";
import authRouter from "./routes/authRoutes";
import { errorHandler } from "./utils/errorHandler";
import tokenValidate from "./utils/tokenValidate";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", authRouter);
app.use("/api", tokenValidate, todoRouter);

app.use(errorHandler);

connectionString.on("connect", () => {
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
});
