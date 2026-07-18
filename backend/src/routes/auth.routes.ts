import { Router } from "express";
import { loginSchema, registerSchema } from "@carebridge/shared";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { createToken, hashPassword, passwordMatches } from "../services/auth.service.js";
import { AppError } from "../utils/app-error.js";

export const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const input = registerSchema.parse(req.body);
    const email = input.email.toLowerCase();
    if (await prisma.user.findUnique({ where: { email } })) throw new AppError(409, "An account with this email already exists.");
    const user = await prisma.user.create({
      data: { fullName: input.fullName, email, passwordHash: await hashPassword(input.password), role: input.role, patient: input.role === "PATIENT" ? { create: {} } : undefined },
    });
    res.status(201).json({ token: createToken(user), user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role, status: user.status } });
  } catch (error) { next(error); }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const input = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
    if (!user || !(await passwordMatches(input.password, user.passwordHash))) throw new AppError(401, "Email or password is incorrect.");
    if (user.status === "SUSPENDED") throw new AppError(403, "This account is suspended.");
    res.json({ token: createToken(user), user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role, status: user.status } });
  } catch (error) { next(error); }
});

authRouter.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.auth!.userId }, include: { patient: true } });
    if (!user) throw new AppError(404, "User not found.");
    res.json({ user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role, status: user.status, patient: user.patient } });
  } catch (error) { next(error); }
});
