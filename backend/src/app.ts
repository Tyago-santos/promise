import express from "express";
import cors from "cors";
import { env } from "@/config/env.js";
import { routes } from "@/routes/index.js";
import { errorMiddleware, notFoundMiddleware } from "@/middlewares/error.middleware.js";

export const app = express();

const corsOrigins = env.CORS_ORIGIN.split(",").map((origin) => origin.trim());
app.use(cors({ origin: corsOrigins }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
