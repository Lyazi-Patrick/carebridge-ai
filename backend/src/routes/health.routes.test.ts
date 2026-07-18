import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../app.js";

describe("GET /api/health", () => {
  it("returns the CareBridge API health response", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "ok",
      service: "carebridge-api",
    });
    expect(response.body.timestamp).toEqual(expect.any(String));
  });
});
