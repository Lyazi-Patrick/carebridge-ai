import type { UserRole } from "@carebridge/shared";

export type AuthUser = { id: string; fullName: string; email: string; role: UserRole; status: string };
export type MedicalDocument = { id: string; fileName: string; mimeType: string; secureUrl: string };
export type FundraisingCase = { id: string; title: string; diagnosis: string; treatmentPlan: string; story: string; targetAmount: string | number; raisedAmount: string | number; status: string; aiSummary?: string | null; documents: MedicalDocument[] };
