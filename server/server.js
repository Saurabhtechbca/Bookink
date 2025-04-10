import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "bookink", // optional if already in URI
    serverSelectionTimeoutMS: 10000, // Optional: custom timeout
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Start the server only after DB is connected
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
