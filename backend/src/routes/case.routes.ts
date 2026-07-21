import { Router } from "express";
import multer from "multer";
import { caseSchema } from "@carebridge/shared";
import { prisma } from "../lib/prisma.js";
import { allowRoles, requireAuth } from "../middleware/auth.js";
import { uploadMedicalDocument } from "../services/cloudinary.service.js";
import { generateCaseSummary } from "../services/openai.service.js";
import { AppError } from "../utils/app-error.js";

export const caseRouter = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024, files: 5 }, fileFilter: (_req, file, callback) => callback(null, ["application/pdf", "image/jpeg", "image/png"].includes(file.mimetype)) });
const patientOnly = [requireAuth, allowRoles("PATIENT")];
const includeCase = { documents: true } as const;

async function profileFor(userId: string) {
  const profile = await prisma.patientProfile.findUnique({ where: { userId } });
  if (!profile) throw new AppError(404, "Patient profile not found.");
  return profile;
}
async function ownedCase(caseId: string, userId: string) {
  const profile = await profileFor(userId);
  const fundraisingCase = await prisma.fundraisingCase.findFirst({ where: { id: caseId, patientId: profile.id }, include: includeCase });
  if (!fundraisingCase) throw new AppError(404, "Fundraising case not found.");
  return fundraisingCase;
}

caseRouter.get("/mine", ...patientOnly, async (req, res, next) => {
  try { const profile = await profileFor(req.auth!.userId); res.json({ cases: await prisma.fundraisingCase.findMany({ where: { patientId: profile.id }, include: includeCase, orderBy: { updatedAt: "desc" } }) }); } catch (error) { next(error); }
});

caseRouter.post("/", ...patientOnly, async (req, res, next) => {
  try { const profile = await profileFor(req.auth!.userId); const input = caseSchema.parse(req.body); const fundraisingCase = await prisma.fundraisingCase.create({ data: { ...input, targetAmount: input.targetAmount, patientId: profile.id }, include: includeCase }); res.status(201).json({ case: fundraisingCase }); } catch (error) { next(error); }
});

caseRouter.get("/:caseId", ...patientOnly, async (req, res, next) => {
  try { res.json({ case: await ownedCase(String(req.params.caseId), req.auth!.userId) }); } catch (error) { next(error); }
});

caseRouter.patch("/:caseId", ...patientOnly, async (req, res, next) => {
  try { const current = await ownedCase(String(req.params.caseId), req.auth!.userId); if (current.status !== "DRAFT") throw new AppError(409, "Only draft cases can be edited."); const input = caseSchema.parse(req.body); const fundraisingCase = await prisma.fundraisingCase.update({ where: { id: current.id }, data: input, include: includeCase }); res.json({ case: fundraisingCase }); } catch (error) { next(error); }
});

caseRouter.post("/:caseId/documents", ...patientOnly, upload.array("documents", 5), async (req, res, next) => {
  try { const current = await ownedCase(String(req.params.caseId), req.auth!.userId); if (current.status !== "DRAFT") throw new AppError(409, "Documents can only be added to draft cases."); const files = req.files as Express.Multer.File[]; if (!files?.length) throw new AppError(400, "Add at least one PDF, PNG, or JPEG document."); const documents = await Promise.all(files.map(async (file) => { const stored = await uploadMedicalDocument(file); return prisma.medicalDocument.create({ data: { caseId: current.id, fileName: file.originalname, mimeType: file.mimetype, ...stored } }); })); res.status(201).json({ documents }); } catch (error) { next(error); }
});

caseRouter.post("/:caseId/ai-summary", ...patientOnly, async (req, res, next) => {
  try { const current = await ownedCase(String(req.params.caseId), req.auth!.userId); const summary = await generateCaseSummary(current); res.json({ summary }); } catch (error) { next(error); }
});

caseRouter.patch("/:caseId/ai-summary", ...patientOnly, async (req, res, next) => {
  try { const current = await ownedCase(String(req.params.caseId), req.auth!.userId); const aiSummary = String(req.body.summary ?? "").trim(); if (!aiSummary || aiSummary.length > 2_000) throw new AppError(400, "Provide a valid summary."); const fundraisingCase = await prisma.fundraisingCase.update({ where: { id: current.id }, data: { aiSummary }, include: includeCase }); res.json({ case: fundraisingCase }); } catch (error) { next(error); }
});

caseRouter.post("/:caseId/submit", ...patientOnly, async (req, res, next) => {
  try { const current = await ownedCase(String(req.params.caseId), req.auth!.userId); if (current.status !== "DRAFT") throw new AppError(409, "This case has already been submitted."); if (!current.documents.length) throw new AppError(400, "Upload at least one medical document before submitting."); const fundraisingCase = await prisma.fundraisingCase.update({ where: { id: current.id }, data: { status: "SUBMITTED" }, include: includeCase }); res.json({ case: fundraisingCase }); } catch (error) { next(error); }
});
/**
 * Hospital: View submitted cases
 */
caseRouter.get(
  "/hospital/pending",
  requireAuth,
  allowRoles("HOSPITAL"),
  async (_req, res, next) => {
    try {
      const cases = await prisma.fundraisingCase.findMany({
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

      res.json({ cases });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Hospital verifies a case
 */
caseRouter.patch(
  "/hospital/:caseId/verify",
  requireAuth,
  allowRoles("HOSPITAL"),
  async (req, res, next) => {
    try {
      const caseId = String(req.params.caseId);

      const fundraisingCase =
        await prisma.fundraisingCase.findUnique({
          where: {
            id: caseId,
          },
        });

      if (!fundraisingCase) {
        throw new AppError(
          404,
          "Fundraising case not found"
        );
      }

      if (fundraisingCase.status !== "SUBMITTED") {
        throw new AppError(
          409,
          "Only submitted cases can be verified"
        );
      }

      const updatedCase =
        await prisma.fundraisingCase.update({
          where: {
            id: caseId,
          },
          data: {
            status: "HOSPITAL_VERIFIED",
          },
        });

      res.json({
        message: "Case verified successfully",
        case: updatedCase,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Hospital rejects a case
 */
caseRouter.patch(
  "/hospital/:caseId/reject",
  requireAuth,
  allowRoles("HOSPITAL"),
  async (req, res, next) => {
    try {
      const caseId = String(req.params.caseId);

      const fundraisingCase =
        await prisma.fundraisingCase.findUnique({
          where: {
            id: caseId,
          },
        });

      if (!fundraisingCase) {
        throw new AppError(
          404,
          "Fundraising case not found"
        );
      }

      const updatedCase =
        await prisma.fundraisingCase.update({
          where: {
            id: caseId,
          },
          data: {
            status: "REJECTED",
          },
        });

      res.json({
        message: "Case rejected",
        case: updatedCase,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Public: Donors can view verified fundraising campaigns
 */
caseRouter.get(
  "/public",
  async (_req, res, next) => {
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
  }
);