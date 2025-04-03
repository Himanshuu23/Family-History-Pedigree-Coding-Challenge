import express from "express";
import cors from "cors";
import familyRoutes from "./routes/user.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/family", familyRoutes); // Register family routes

export default app;

//http://localhost:8080/v1/projects/backendx2025/databases/(default)/documents/family