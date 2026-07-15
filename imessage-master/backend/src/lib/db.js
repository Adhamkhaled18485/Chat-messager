import mongoose from "mongoose";

export async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI?.trim();

    if (!mongoUri) {
      console.warn("MONGO_URI is not set; skipping MongoDB connection for local preview.");
      return;
    }

    const conn = await mongoose.connect(mongoUri);

    console.log("MongoDB connected", conn.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.warn("Continuing without a database connection for local preview.");
  }
}
