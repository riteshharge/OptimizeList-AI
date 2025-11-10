import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // load .env

const uri =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/optimizelist";
console.log("Connecting to MongoDB at:", uri);

mongoose.set("strictQuery", false);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

export default mongoose;
