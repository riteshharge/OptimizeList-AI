import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import amazonRoutes from "./src/routes/route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: "*", methods: ["GET", "POST"], credentials: true }));

// API Routes
app.use("/api", amazonRoutes);

// Serve frontend correctly
const DIST_PATH = path.join(process.cwd(), "frontend/dist");

// Serve static files without extra prefix
app.use(express.static(DIST_PATH));

// SPA fallback: send index.html for any unmatched route
app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_PATH, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
