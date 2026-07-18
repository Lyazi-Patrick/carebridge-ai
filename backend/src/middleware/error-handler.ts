import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError } from "../utils/app-error.js";

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    error: { message: `Route ${req.method} ${req.path} was not found.` },
  });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);
  if (error instanceof AppError) return res.status(error.statusCode).json({ error: { message: error.message } });
  res.status(500).json({ error: { message: "An unexpected server error occurred." } });
};
