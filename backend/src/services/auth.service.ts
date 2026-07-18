import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { User } from "@prisma/client";
import { env } from "../config/env.js";
import { AppError } from "../utils/app-error.js";

export async function hashPassword(password: string) { return bcrypt.hash(password, 12); }
export async function passwordMatches(password: string, hash: string) { return bcrypt.compare(password, hash); }
export function createToken(user: User) {
  if (!env.JWT_SECRET) throw new AppError(500, "JWT authentication is not configured.");
  return jwt.sign({ role: user.role }, env.JWT_SECRET, { subject: user.id, expiresIn: "12h" });
}
