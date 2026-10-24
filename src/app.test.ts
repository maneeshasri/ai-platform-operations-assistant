
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./app";

describe("GET /", () => {
  it("returns a welcome message with HTTP 200", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Welcome to the AI Cloud Operations Platform"
    );
    expect(response.body.endpoints).toContain("/health");
  });
});

describe("GET /incidents", () => {
  it("returns a list of incidents with a count", async () => {
    const response = await request(app).get("/incidents");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("incidents");
    expect(Array.isArray(response.body.incidents)).toBe(true);
    expect(response.body.count).toBe(response.body.incidents.length);
  });
});

describe("POST /incidents", () => {
  it("rejects an incident with an invalid severity", async () => {
    const response = await request(app)
      .post("/incidents")
      .send({
        title: "API unavailable",
        severity: "critical",
        service: "incident-api",
        description: "Health checks are failing"
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "severity must be low, medium or high"
    );
  });
  
it("creates an incident with valid input", async () => {
  const response = await request(app)
    .post("/incidents")
    .send({
      title: "Database outage",
      severity: "high",
      service: "payments",
      description: "Database connections are failing"
    });

  expect(response.status).toBe(201);
  expect(response.body.title).toBe("Database outage");
  expect(response.body.severity).toBe("high");
  expect(response.body).toHaveProperty("id");
  expect(response.body).toHaveProperty("createdAt");
});

});

