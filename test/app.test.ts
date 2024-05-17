import supertest from "supertest";
import  app  from "../src/app";
import { setupDB } from './configs/dbConnection';

describe('GET /', () => {
  setupDB()
  
  it('responds with 200 and a welcome message', async () => {
      const response = await supertest(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('🚀Welcome to EasyGo-API 🚕..');
  });
});

describe("Driver API Endpoint Tests", () => {
  setupDB()

  it("POST /api/v1/driver/register should register a new driver", async () => {
    const response = await supertest(app).post("/api/v1/driver/register").send({
      name: "tushar",
      email: "tushar@gmail.com",
      phoneNumber: "9999999999",
      role: "driver",
    });
    expect(response.status).toBe(200);
  });

  it("POST /api/v1/driver/verify-otp should verify a otp", async () => {
    const response = await supertest(app)
      .post("/api/v1/driver/verify-otp")
      .send({
        phoneNumber: "9999999999",
        otp: "9999",
      });
    expect(response.status).toBe(200);
  });

  it("POST /api/v1/driver/send-login-otp should send a otp", async () => {
    const response = await supertest(app)
      .post("/api/v1/driver/send-login-otp")
      .send({
        phoneNumber: "9999999999",
      });
    expect(response.status).toBe(200);
  });

  it("POST /api/v1/driver/login should login a driver", async () => {
    const response = await supertest(app).post("/api/v1/driver/login").send({
      phoneNumber: "9999999999",
      otp: "9999",
    });
    expect(response.status).toBe(200);
  });

  it("GET / should return all drivers list", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/driver/available/list should return all available drivers list", async () => {
    const response = await supertest(app).get("/api/v1/driver/available/list");
    expect(response.status).toBe(200);
  });
});

describe("Vehicle API Endpoint Tests", () => {
  setupDB()

  it("GET /api/v1/driver/upload should return url to upload", async () => {
    const response = await supertest(app).get("/api/v1/driver/upload");
    expect(response.status).toBe(200);
  });
});