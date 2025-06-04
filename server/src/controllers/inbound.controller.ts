import { Request, Response } from "express";

const handleInboundEmail = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.error("Error handling inbound email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { handleInboundEmail };
