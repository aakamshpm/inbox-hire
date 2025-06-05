import { Response } from "express";

const setToken = async (
  res: Response,
  refreshToken: string,
  accessToken: string
) => {
  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .setHeader("Authorization", `Bearer ${accessToken}`);
};

export default setToken;
