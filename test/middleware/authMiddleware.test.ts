import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyToken, isAdmin } from "../../src/middleware/authMiddleware";
import logger from "../../src/utils/logger";

jest.mock("jsonwebtoken");
jest.mock("../../src/utils/logger");

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
      (jwt.verify as jest.Mock).mockReturnValueOnce({ role: "driver" });

      req.headers = { authorization: "Bearer validToken" };
      verifyToken(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      expect(logger.info).not.toHaveBeenCalled();
      expect(logger.error).not.toHaveBeenCalled();
    });

    it("should return 404 if no token is provided", () => {
      verifyToken(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        messaage: "No Token Found",
      });
      expect(logger.info).toHaveBeenCalledWith("NO TOKEN FOUND");
    });

    it("should return 404 if token cannot be decoded", () => {
      (jwt.verify as jest.Mock).mockReturnValueOnce({});

      req.headers = { authorization: "Bearer invalidToken" };
      verifyToken(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Unable to Decode Token",
      });
      expect(logger.info).toHaveBeenCalledWith("UNABLE TO DECODE TOKEN");
    });

    it("should return 500 if an error occurs during token verification", () => {
      (jwt.verify as jest.Mock).mockImplementationOnce(() => {
        throw new Error("Token error");
      });

      req.headers = { authorization: "Bearer invalidToken" };
      verifyToken(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Error occured at verifying Token",
      });
      expect(logger.error).toHaveBeenCalledWith(
        "AN ERROR OCCURED WHILE VERIFYING TOKEN!! ",
        expect.any(Error)
      );
    });
  });

   describe("isAdmin middleware", () => {
    it("should call next() if user role is admin", () => {
      req.user = { role: "admin" };

      isAdmin(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      expect(logger.warn).not.toHaveBeenCalled();
      expect(logger.error).not.toHaveBeenCalled();
    });

    it("should return 401 if user role is not admin", () => {
      req.user = { role: "user" };

      isAdmin(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Protected routes for admin only",
      });
      expect(logger.warn).toHaveBeenCalledWith("PROTECTED ROUTE FOR ADMIN ONLY");
    });

    it("should return 500 if an error occurs in isAdmin middleware", () => {
      req.user = undefined;

      isAdmin(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Error occured at isAdmin",
      });
      expect(logger.error).toHaveBeenCalledWith(
        "ERROR OCCURED AT ISADMIN MIDDLEWARE",
        expect.any(Error)
      );
    });
  });
});