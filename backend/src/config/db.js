import mongoose from "../../MongoConnections.js";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    asin: { type: String, required: true, unique: true, maxlength: 20 },
    original_data: { type: Schema.Types.Mixed },
    optimized_data: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now },
  },
  { collection: "products" }
);

const Product = mongoose.model("Product", productSchema);

async function ensureIndexes() {
  try {
    await Product.init(); // creates indexes declared in schema (e.g., unique)
    console.log("'products' collection ready with indexes.");
  } catch (err) {
    console.error("Error ensuring product indexes:", err);
    process.exit(1);
  }
}

ensureIndexes();

export { Product };
