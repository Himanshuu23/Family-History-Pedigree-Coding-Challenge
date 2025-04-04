import express from "express";
import cors from "cors";
import familyRoutes from "./routes/family.routes";
import { getAllFamilyMembers, getFamilyTree } from "./services/family.service";
import { connectRedis } from "./services/redisClient";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/family", familyRoutes);
app.get("/tree", getFamilyTree);
app.get("/all", getAllFamilyMembers);

// Connect to Redis before starting the server
connectRedis();

export default app;

//http://localhost:8080/v1/projects/backendx2025/databases/(default)/documents/family