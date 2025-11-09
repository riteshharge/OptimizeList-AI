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
app.use(cors({ origin: "*", methods: ["GET", "POST"], credentials: true })); // allow all origins for now

// API Routes
app.use("/api", amazonRoutes);

// Serve frontend
app.use(
  "/AmazonProductListingWithAI",
  express.static(path.join(process.cwd(), "frontend/dist"))
);
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend/dist/index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
