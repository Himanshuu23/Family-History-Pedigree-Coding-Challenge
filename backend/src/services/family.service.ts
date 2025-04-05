import { Request, Response, NextFunction } from "express";
import { createClient } from "redis";
import { db } from "../firestore";

const FAMILY_COLLECTION = "family";
const redisClient = createClient();
redisClient.connect();

const CACHE_EXPIRATION = 3600;

export const addFamilyMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { emailId, relation, name, age, gender, isAlive, hasDiabetes, diabetesDetails, hasHeartDisease, heartDiseaseDetails, hasCancer, cancerDetails, otherConditions } = req.body;

    if (!emailId || !relation || !name) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const docRef = await db.collection(FAMILY_COLLECTION).add({
      emailId, relation, name, age, gender, isAlive, hasDiabetes, diabetesDetails, hasHeartDisease, heartDiseaseDetails, hasCancer, cancerDetails, otherConditions, createdAt: new Date(),
    });

    await redisClient.del(emailId);

    res.status(201).json({ id: docRef.id, message: "Family member added successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllFamilyMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { emailId } = req.body;

    if (!emailId) {
      res.status(400).json({ error: "Email ID is required" });
      return;
    }

    const cachedData = await redisClient.get(emailId);
    if (cachedData) {
      res.status(200).json(JSON.parse(cachedData));
      return;
    }

    const snapshot = await db.collection(FAMILY_COLLECTION).where("emailId", "==", emailId).get();
    const familyMembers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    await redisClient.setEx(emailId, CACHE_EXPIRATION, JSON.stringify(familyMembers));

    res.status(200).json(familyMembers);
  } catch (error) {
    next(error);
  }
};

export const getFamilyTree = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { emailId } = req.body;

    if (!emailId) {
      res.status(400).json({ error: "Email ID is required" });
      return;
    }

    const cachedData = await redisClient.get(`familyTree:${emailId}`);
    if (cachedData) {
      res.status(200).json(JSON.parse(cachedData));
      return;
    }

    const snapshot = await db.collection(FAMILY_COLLECTION).where("emailId", "==", emailId).get();
    const familyTree = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    await redisClient.setEx(`familyTree:${emailId}`, CACHE_EXPIRATION, JSON.stringify(familyTree));

    res.status(200).json(familyTree);
  } catch (error) {
    next(error);
  }
};
