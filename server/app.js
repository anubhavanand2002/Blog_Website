import express from "express";
import cors from "cors";

const app = express();

//use functions of app called as middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

app.use("/api", userRoutes);
app.use("/api",blogRoutes);
export default app;
