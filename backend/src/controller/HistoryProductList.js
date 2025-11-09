import "../../MongoConnections.js";
import Product from "../models/Product.js";

export async function AllHistoryProductList(req, res) {
  try {
    // Fetch all products sorted in descending order of creation
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    console.error("MongoDB Fetch Error:", err.message);

    res.status(500).json({
      success: false,
      message: "Database error",
      error: err.message,
    });
  }
}
