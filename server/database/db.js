import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "bookink",
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed");
    process.exit(1);
  }
};
