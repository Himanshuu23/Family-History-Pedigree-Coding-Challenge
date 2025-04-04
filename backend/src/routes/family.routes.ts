import express from "express";
// import {authMiddleware} from "../middlewares/auth";
import {
  addFamilyMember,
  getFamilyMember,
} from "../services/family.service";

const router = express.Router();

// router.use(authMiddleware);

router.post("/", addFamilyMember);
router.get("/", getFamilyMember);

export default router;
