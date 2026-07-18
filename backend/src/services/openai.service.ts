import OpenAI from "openai";
import { env } from "../config/env.js";
import { AppError } from "../utils/app-error.js";

export async function generateCaseSummary(input: { diagnosis: string; treatmentPlan: string; story: string }) {
  if (!env.OPENAI_API_KEY) throw new AppError(503, "AI summaries are not configured.");
  const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  const completion = await client.responses.create({
    model: "gpt-4.1-mini",
    instructions: "Write a compassionate, factual fundraising summary in under 120 words. Do not diagnose, add facts, promise outcomes, or include private identifiers beyond what the patient supplied.",
    input: `Diagnosis: ${input.diagnosis}\nTreatment plan: ${input.treatmentPlan}\nPatient story: ${input.story}`,
  });
  return completion.output_text.trim();
}
