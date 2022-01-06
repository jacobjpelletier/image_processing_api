/* TESTS FOR INDEX.js*/
import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Test endpoint responses", () => {
  it("gets the api endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
  it("query to resize image - width and height", async () => {
    const response = await request.get("/?width=100&height=100");
    expect(response.status).toBe(200);
  });
  it("query to resize image - width only", async () => {
    const response = await request.get("/?width=100");
    expect(response.status).toBe(200);
  });
  it("query to resize image - height only", async () => {
    const response = await request.get("/?height=100");
    expect(response.status).toBe(200);
  });
});
