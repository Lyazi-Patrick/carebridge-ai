import { Router } from "express";
import { healthResponseSchema } from "@carebridge/shared";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  const payload = healthResponseSchema.parse({
    status: "ok",
    service: "carebridge-api",
    timestamp: new Date().toISOString(),
  });

  res.status(200).json(payload);
});
