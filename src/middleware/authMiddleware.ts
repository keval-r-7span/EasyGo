import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT } from "../helper/constants";
import logger from "../utils/logger";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

declare module "express" {
  interface Request {
    user?: JwtPayload;
  }
}

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];
    const token = (authHeader as string)?.split(" ")[1];
    if (!token) {
      return res.json({
        success: false,
        messaage: "No Token Found",
      });
    }
    try {
      const decode = jwt.verify(token, JWT.SECRET) as JwtPayload;
      if (!decode.role) {
        return res.json({
          success: false,
          message: "Unable to Decode Token",
        });
      }
      req.user = decode;
      next();
    } catch (error) {
      logger.error(error);
      return res.json({
        success: false,
        message: "Error occured at verifying Token",
      });
    }
  } catch (error) {
    logger.error(error);
    return res.json({
      success: false,
      message: "Error occured at verifying Token",
    });
  }
};

const isDriver = (
  req: AuthenticatedRequest & { user: { role: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role !== "driver") {
      return res.json({
        success: false,
        message: "Protected routes for driver only",
      });
    }
    next();
  } catch (error) {
    logger.error(error);
    return res.json({
      success: false,
      data: "Error occured at isDriver",
    });
  }
};

const isAdmin = (
  req: AuthenticatedRequest & { user: { role: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role !== "admin") {
      return res.json({
        success: false,
        message: "Protected routes for admin only",
      });
    }
    next();
  } catch (error) {
    logger.error(error);
    return res.json({
      success: false,
      message: "Error occured at isAdmin",
    });
  }
};

const isUser = (
  req: AuthenticatedRequest & { user: { role: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role !== "user") {
      return res.json({
        success: false,
        message: "Protected routes for user only",
      });
    }
    next();
  } catch (error) {
    logger.error(error);
    return res.json({
      success: false,
      data: "Error occured at isUser",
    });
  }
};

export { verifyToken, isUser, isDriver, isAdmin };