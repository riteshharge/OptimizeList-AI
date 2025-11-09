import mongoose from '../../MongoConnections.js';

const ProductSchema = new mongoose.Schema({
  asin: { type: String, required: true, unique: true },
  original_data: mongoose.Schema.Types.Mixed,
  optimized_data: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
}, { collection: 'products' });

const Product = mongoose.model('Product', ProductSchema);
export default Product;
