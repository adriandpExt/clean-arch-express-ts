import express from "express";

import cors from "cors";
import bodyParser from "body-parser";
import connectionString from "./db/connection";

import todoRouter from "./routes/todoRoutes";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

connectionString.on("connect", () => {
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
});

app.use("/api", todoRouter);
