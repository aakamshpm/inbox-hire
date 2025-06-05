import express, { Request, Response } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import setToken from "../utils/setToken";

const router = express.Router();

router.post("/refresh-token", async (req: Request, res: Response) => {
  const refreshToken = req.cookies["refreshToken"];

  if (!refreshToken) {
    res.status(401);
    throw new Error("No refresh token provided");
  }

  try {
    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Generate new access token
    const newAccessToken = generateAccessToken(decoded.userId);
    const newRefreshToken = generateRefreshToken(decoded.userId);

    await setToken(res, newRefreshToken, newAccessToken);
    res.status(200).json({ message: "New token generated!" });
  } catch (error) {
    res.status(401);
    throw new Error("Invalid Token");
  }
});

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

export default router;
