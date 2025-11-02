import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "restaurantDB",
    });
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
