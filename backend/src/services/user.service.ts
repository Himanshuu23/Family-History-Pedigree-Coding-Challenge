import {Request, Response, NextFunction} from "express";
import { getFirestore } from "firebase-admin/firestore";

const FAMILY_COLLECTION = "family";
const db = getFirestore();

export const addFamilyMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      relation,
      name,
      age,
      gender,
      isAlive,
      hasDiabetes,
      diabetesDetails,
      hasHeartDisease,
      heartDiseaseDetails,
      hasCancer,
      cancerDetails,
      otherConditions,
      emailId
    } = req.body;

    if (!relation || !name || !emailId) {
      res.status(400).json({error: "Missing required fields"});
      return;
    }

    await db.collection(FAMILY_COLLECTION).add({
      emailId,
      relation,
      name,
      age,
      gender,
      isAlive,
      hasDiabetes,
      diabetesDetails,
      hasHeartDisease,
      heartDiseaseDetails,
      hasCancer,
      cancerDetails,
      otherConditions,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Family member added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getFamilyTree = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {emailId} = req.body;
    const snapshot = await db
      .collection(FAMILY_COLLECTION)
      .where("emailId", "==", emailId)
      .get();

    const familyTree = snapshot.docs.map((doc) => doc.data());

    res.status(200).json(familyTree);
  } catch (error) {
    next(error);
  }
};

export const updateFamilyMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {emailId, ...updateData} = req.body;

    const snapshot = await db
      .collection(FAMILY_COLLECTION)
      .where("emailId", "==", emailId)
      .get();

    const batch = db.batch();
    snapshot.docs.forEach(doc => {
      batch.update(doc.ref, updateData);
    });

    await batch.commit();
    res.status(200).json({
      message: "Family members updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFamilyMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {emailId} = req.body;

    const snapshot = await db
      .collection(FAMILY_COLLECTION)
      .where("emailId", "==", emailId)
      .get();

    const batch = db.batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    res.status(200).json({
      message: "All family members deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};