import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017", {
      dbName: "backend-urlpt",
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
};
