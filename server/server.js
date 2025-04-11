// server.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config(); // Load environment variables

// Log current environment
console.log("✅ Environment:", process.env.NODE_ENV);
console.log("✅ Mongo URI:", process.env.MONGO_URI);

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "bookink", // Optional if included in URI
  })
  .then(() => {
    console.log("✅ Connected to MongoDB:", mongoose.connection.name);

    // Start the server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
