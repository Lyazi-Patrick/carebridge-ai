import { describe, expect, it } from "vitest";
import { healthResponseSchema } from "@carebridge/shared";

describe("health response contract", () => {
  it("accepts the API health payload shown by the React UI", () => {
    expect(healthResponseSchema.parse({
      status: "ok",
      service: "carebridge-api",
      timestamp: "2026-07-17T16:00:00.000Z",
    })).toMatchObject({ status: "ok", service: "carebridge-api" });
  });
});
