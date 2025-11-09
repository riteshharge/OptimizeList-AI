Migration notes:
- MySQL replaced with MongoDB (mongoose).
- New files:
  - MongoConnections.js
  - src/models/Product.js
- Update your env: set MONGODB_URI to your MongoDB connection string.
- Review modified backend files for manual adjustments where SQL logic was complex.
