import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/optimizelist';
mongoose.set('strictQuery', false);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB at', uri);
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

export default mongoose;
