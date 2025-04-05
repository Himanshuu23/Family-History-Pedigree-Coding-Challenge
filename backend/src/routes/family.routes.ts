import express from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  addFamilyMember,
  getAllFamilyMembers,
} from "../services/family.service";

const router = express.Router();

router.use((req, res, next) => {
  authMiddleware(req, res, next).catch(next);
});

router.post("/", addFamilyMember);
router.get("/", getAllFamilyMembers);

export default router;
