Migration to MongoDB applied.

- mysqlConnections.js files were replaced with a MongoDB connection (mongoose) and backed up with .bak.
- MongoConnections.js created at backend root.
- Product model created at src/models/Product.js
- Controllers updated to use Product model instead of raw SQL queries.

Please set MONGODB_URI in environment and run `npm install` in backend to install dependencies.
