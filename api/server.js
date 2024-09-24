import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import entryRoutes from "./routes/entryRoutes.js";
import setupRoutes from "./routes/setupRoutes.js";
import indexRoutes from "./routes/indexRoutes.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRoutes);
app.use("/api/setup", setupRoutes);
app.use("/api/entry", entryRoutes);

app.listen(3000, () => {
  console.log("SERVER STARTED");
});
