import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyToken, isAdmin } from "../../src/middleware/authMiddleware";
// import logger from "../utils/logger";

jest.mock("jsonwebtoken");

describe("Middleware Tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock<NextFunction>;

  beforeEach(() => {
    req = {
      headers: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe("verifyToken middleware", () => {
    it("should call next() if token is provided and valid", () => {
      (jwt.verify as jest.Mock).mockReturnValueOnce({ role: "user" });

      req.headers = { authorization: "Bearer validToken" };
      verifyToken(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
    });

    it("should return 404 if no token is provided", () => {
      verifyToken(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
