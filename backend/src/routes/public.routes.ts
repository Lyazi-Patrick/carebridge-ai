import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const publicRouter = Router();

/**
 * Public verified cases
 */
publicRouter.get("/cases", async (_req, res, next) => {
  try {
    const cases = await prisma.fundraisingCase.findMany({
      where: {
        status: "HOSPITAL_VERIFIED",
      },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
        documents: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ cases });
  } catch (error) {
    next(error);
  }
});