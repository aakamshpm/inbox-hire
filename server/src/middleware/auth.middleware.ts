import { NextFunction, Request, Response } from "express";
import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1]; // "Bearer <token>"
  const refreshToken = req.cookies["refreshToken"];

  // No tokens at all
  if (!accessToken && !refreshToken) {
    return res
      .status(401)
      .json({ message: "Access Denied. No Token Provided" });
  }

  try {
    const decoded = verifyAccessToken(accessToken!);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    // accessToken invalid, check for refresh
    if (!refreshToken) {
      return res.status(401).json({
        message: "Invalid or Expired Access Token, and No Refresh Token",
      });
    }

    try {
      const decoded = verifyRefreshToken(refreshToken);
      const newAccessToken = generateAccessToken(decoded.userId);

      res.setHeader("Authorization", `Bearer ${newAccessToken}`);

      req.userId = decoded.userId;
      return next();
    } catch (err) {
      res.status(401);
      throw new Error("Invalid or Expired Refresh Token");
    }
  }
};

export default authenticate;
