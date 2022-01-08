/* TESTS FOR INDEX.js*/
import supertest from "supertest";
import app from "../index";
import fs from "fs";

const request = supertest(app);

describe("Test endpoint responses", () => {
  it("get welcome endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
  it("get the api endpoint", async () => {
    const response = await request.get("/resize");
    expect(response.status).toBe(200);
  });
  // test piping
  it("invalid valid file, no dimensions", async () => {
    const response = await request.get("/resize/?filename=m");
    expect(response.status).toBe(200);
  });
  it("invalid valid file, width and height", async () => {
    const response = await request.get(
      "/resize/?filename=m&width=100&height=100"
    );
    expect(response.status).toBe(200);
  });
  it("valid file, no dimensions", async () => {
    const response = await request.get("/resize/?filename=mario");
    expect(response.status).toBe(200);
  });
  it("valid file, invalid dimensions", async () => {
    const response = await request.get(
      "/resize/?filename=mario&width=abc&height=def"
    );
    expect(response.status).toBe(200);
  });
  it("valid file, width and height", async () => {
    const response = await request.get(
      "/resize/?filename=mario&width=100&height=100"
    );
    expect(response.status).toBe(200);
  });
});

describe("Test file system operations", () => {
  it("read from file system", () => {
    expect(fs.existsSync("src/images/mario.jpg")).toBeTrue();
  });
  it("write if file does not exist", async () => {
    /* assumes src/resizedImages/mario-100-100.jpg does not exist */
    const response = await request.get(
      "/resize/?filename=mario&width=123&height=123"
    );
    expect(response.status).toBe(200);
    expect(fs.existsSync("src/resizedImages/mario-123-123.jpg"));
  });
  it("read if file does exist", async () => {
    /* assumes src/resizedImages/mario-100-100.jpg does exist */
    const response = await request.get(
      "/resize/?filename=mario&width=123&height=123"
    );
    expect(response.status).toBe(200);
    expect(fs.existsSync("src/resizedImages/mario-100-100.jpg"));
  });
});
