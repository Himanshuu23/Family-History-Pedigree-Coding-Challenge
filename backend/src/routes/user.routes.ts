import express from "express";
// import {authMiddleware} from "../middlewares/auth";
import {
  addFamilyMember,
  getFamilyTree,
  updateFamilyMember,
  deleteFamilyMember,
} from "../services/user.service";

const router = express.Router();

// router.use(authMiddleware);

router.post("/", addFamilyMember);
router.get("/", getFamilyTree);
router.put("/", updateFamilyMember);
router.delete("/", deleteFamilyMember);

export default router;
