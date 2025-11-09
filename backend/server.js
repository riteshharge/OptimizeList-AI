import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import amazonRoutes from "./src/routes/route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9003;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: "*", methods: ["GET", "POST"], credentials: true }));

// API Routes
app.use("/api", amazonRoutes);

// Serve frontend
const frontendDistPath = path.join(process.cwd(), "frontend/dist");
app.use("/OptimizeList-AI", express.static(frontendDistPath));

// **Serve index.html for any other route under /OptimizeList-AI**
app.get("/OptimizeList-AI/*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
