import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { UserRole } from "@prisma/client";
import { env } from "../config/env.js";
import { AppError } from "../utils/app-error.js";

type TokenPayload = { sub: string; role: UserRole };

export const requireAuth: RequestHandler = (req, _res, next) => {
  const token = req.header("Authorization")?.replace(/^Bearer\s+/i, "");
  if (!token || !env.JWT_SECRET) return next(new AppError(401, "Authentication is required."));
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    req.auth = { userId: payload.sub, role: payload.role };
    next();
  } catch { next(new AppError(401, "Your session is invalid or expired.")); }
};

export const allowRoles = (...roles: UserRole[]): RequestHandler => (req, _res, next) => {
  if (!req.auth || !roles.includes(req.auth.role)) return next(new AppError(403, "You do not have permission to perform this action."));
  next();
};
