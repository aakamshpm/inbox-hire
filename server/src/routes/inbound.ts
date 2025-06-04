import express from "express";
import { handleInboundEmail } from "../controllers/inbound.controller";

const router = express.Router();

router.post("/", handleInboundEmail);

export default router;
