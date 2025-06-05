import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_SECRET, REFRESH_SECRET } from "../utils/constants";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

interface JwtPayload {
  userId: string;
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
    const decoded = jwt.verify(accessToken!, ACCESS_SECRET) as JwtPayload;
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    // accessToken invalid, check for refresh
    if (!refreshToken) {
      return res
        .status(401)
        .json({
          message: "Invalid or Expired Access Token, and No Refresh Token",
        });
    }

    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as JwtPayload;
      const newAccessToken = jwt.sign(
        { userId: decoded.userId },
        ACCESS_SECRET,
        {
          expiresIn: "30m",
        }
      );

      // Optional: attach to header so frontend can refresh its token
      res.setHeader("Authorization", `Bearer ${newAccessToken}`);

      req.userId = decoded.userId;
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid Refresh Token" });
    }
  }
};

export default authenticate;
