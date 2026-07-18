import { z } from "zod";

export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  service: z.literal("carebridge-api"),
  timestamp: z.string().datetime(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

export const userRoleSchema = z.enum(["PATIENT", "DONOR", "HOSPITAL", "NGO", "ADMIN"]);
export type UserRole = z.infer<typeof userRoleSchema>;

export const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
  role: userRoleSchema,
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({ email: z.string().trim().email(), password: z.string().min(1) });
export type LoginInput = z.infer<typeof loginSchema>;

export const caseSchema = z.object({
  title: z.string().trim().min(5).max(140),
  diagnosis: z.string().trim().min(3).max(500),
  treatmentPlan: z.string().trim().min(10).max(2_000),
  story: z.string().trim().min(30).max(5_000),
  targetAmount: z.coerce.number().positive().max(100_000_000),
});
export type CaseInput = z.infer<typeof caseSchema>;
