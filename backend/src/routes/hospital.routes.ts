import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";
import { AppError } from "../utils/app-error.js";

export const hospitalRouter = Router();

/*
 * Temporary:
 * For the hackathon we allow only users
 * registered as HOSPITAL.
 */
const hospitalOnly = [
  requireAuth,
  allowRoles("HOSPITAL"),
];

/*
 * ==========================================
 * GET ALL SUBMITTED CASES
 * ==========================================
 */

hospitalRouter.get(
  "/cases",
  ...hospitalOnly,
  async (_req, res, next) => {
    try {

      const cases =
        await prisma.fundraisingCase.findMany({

          where: {
            status: "SUBMITTED",
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

      res.json({
        cases,
      });

    } catch (error) {
      next(error);
    }
  }
);

/*
 * ==========================================
 * GET ONE CASE
 * ==========================================
 */

hospitalRouter.get(
  "/cases/:id",
  ...hospitalOnly,
  async (req, res, next) => {

    try {

      const item =
        await prisma.fundraisingCase.findUnique({

          where: {
            id: String(req.params.id),
          },

          include: {

            patient: {
              include: {
                user: true,
              },
            },

            documents: true,
          },
        });

      if (!item) {
        throw new AppError(
          404,
          "Case not found."
        );
      }

      res.json({
        case: item,
      });

    } catch (error) {
      next(error);
    }
  }
);

/*
 * ==========================================
 * VERIFY
 * ==========================================
 */

hospitalRouter.patch(
  "/cases/:id/verify",
  ...hospitalOnly,
  async (req, res, next) => {

    try {

      const current =
        await prisma.fundraisingCase.findUnique({

          where: {
            id: String(req.params.id),
          },
        });

      if (!current) {

        throw new AppError(
          404,
          "Case not found."
        );

      }

      if (
        current.status !== "SUBMITTED"
      ) {

        throw new AppError(
          409,
          "Only submitted cases can be verified."
        );

      }

      const updated =
        await prisma.fundraisingCase.update({

          where: {
            id: current.id,
          },

          data: {
            status:
              "HOSPITAL_VERIFIED",
          },
        });

      res.json({
        case: updated,
      });

    } catch (error) {
      next(error);
    }
  }
);

/*
 * ==========================================
 * REJECT
 * ==========================================
 */

hospitalRouter.patch(
  "/cases/:id/reject",
  ...hospitalOnly,
  async (req, res, next) => {

    try {

      const current =
        await prisma.fundraisingCase.findUnique({

          where: {
            id: String(req.params.id),
          },
        });

      if (!current) {

        throw new AppError(
          404,
          "Case not found."
        );

      }

      const updated =
        await prisma.fundraisingCase.update({

          where: {
            id: current.id,
          },

          data: {
            status: "REJECTED",
          },
        });

      res.json({
        case: updated,
      });

    } catch (error) {
      next(error);
    }
  }
);