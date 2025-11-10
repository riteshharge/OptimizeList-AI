import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import fs from "fs";
import amazonRoutes from "./src/routes/route.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/optimizelist";
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`✅ MongoDB connected at ${mongoUri}`))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// API routes
app.use("/api", amazonRoutes);

// Health check
app.get("/api/health", (req, res) =>
  res.json({ status: "OK", message: "Backend running smoothly 🚀" })
);

// Serve React frontend
let frontendDistPath = path.join(__dirname, "..", "frontend", "build"); // CRA default
if (!fs.existsSync(frontendDistPath)) {
  frontendDistPath = path.join(__dirname, "..", "frontend", "dist"); // Vite fallback
}

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get(/.*/, (req, res) =>
    res.sendFile(path.join(frontendDistPath, "index.html"))
  );
} else {
  console.warn(
    "⚠️ React build folder not found. Make sure you run `npm run build` in frontend."
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
