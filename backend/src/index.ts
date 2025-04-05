import express from "express";
import cors from "cors";
import familyRoutes from "./routes/family.routes";
import { getFamilyTree } from "./services/family.service";
import { connectRedis } from "./utils/redis";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/family", familyRoutes);
app.get("/tree", getFamilyTree);

connectRedis();

export default app;
