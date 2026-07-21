import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { healthRouter } from "./routes/health.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { caseRouter } from "./routes/case.routes.js";
import { hospitalRouter } from "./routes/hospital.routes.js";
import { publicRouter } from "./routes/public.routes.js";
export const app = express();

app.use(cors({ origin: env.CLIENT_ORIGIN }));
app.use(express.json({ limit: "1mb" }));

app.use("/api", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/cases", caseRouter);
app.use("/api/hospital", hospitalRouter);
app.use("/api/public", publicRouter);
app.use(notFoundHandler);
app.use(errorHandler);
