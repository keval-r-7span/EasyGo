import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT } from "../helper/constants";

interface AuthenticatedRequest extends Request{
    user?: JwtPayload
}

declare module "express" {
    interface Request {
      user?: JwtPayload;
    }
  }

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    const token = (authHeader as string)?.split(" ")[1];
    if (!token) {
      return res.json({success: false, data: "error"})
    }
    try {
      const decode = jwt.verify(token, JWT.SECRET) as JwtPayload;
      if (!decode.role) {
        return res.json({success: false, data: "error"})
      }
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
      return res.json({success: false, data: "error"})
    }
  } catch (error) {
    console.log(error);
    return res.json({success: false, data: "error"})
  }
};

const isDriver = (req: AuthenticatedRequest & { user: { role: string } }, res: Response, next: NextFunction) => {
  try {
    if (req.user.role !== "driver") {
        return res.json({success: false, data: "error"})
    }
    next();
  } catch (error) {
    console.log(error);
    
    return res.json({success: false, data: "error"})
  }
};

const isAdmin = (req: AuthenticatedRequest & { user: { role: string } }, res: Response, next: NextFunction) => {
  try {
    if (req.user.role !== "admin") {
        return res.json({success: false, data: "error"})
    }
    next();
  } catch (error) {
    console.log(error);
    return res.json({success: false, data: "error"})
  }
};

const isUser = (req: AuthenticatedRequest & { user: { role: string } }, res: Response, next: NextFunction) => {
  try {
    if (req.user.role !== "user") {
        return res.json({success: false, data: "error"})
    }
    next();
  } catch (error) {
    console.log(error);
    return res.json({success: false, data: "error"})
  }
};

export {verifyToken, isUser, isDriver, isAdmin}