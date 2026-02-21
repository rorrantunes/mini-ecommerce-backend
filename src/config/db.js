import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("🟢 MongoDB conectado correctamente");
  } catch (error) {
    console.error("🔴 Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};