import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI || "");
    console.log("Kết nối MongoDB thành công");
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);
  }
}

export default connectDB;
