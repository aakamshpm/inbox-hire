import express from "express";
import authenticate from "../middleware/auth.middleware";
import {
  fetchApplications,
  fetchUserProfile,
  updateUserProfile,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/applications", authenticate, fetchApplications);
router.get("/profile", authenticate, fetchUserProfile);
router.post("/update-profile", authenticate, updateUserProfile);

export default router;
