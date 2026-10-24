import mongoose from "mongoose";
import configService from "../config/config.service.js";
export let db = await mongoose.connect(configService.DB_URI);

export const connectDB = async () => {
  try {
    await mongoose.connect(configService.DB_URI);
    await mongoose.syncIndexes();
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
};
