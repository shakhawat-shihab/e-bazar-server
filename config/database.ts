import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const databaseConnection = async (callback: () => void) => {
  try {
    if (process.env.DATABASE_URL) {
      const client = await mongoose.connect(process.env.DATABASE_URL);
      if (client) {
        console.log("Database connection successfully");
        callback();
      }
    } else {
      console.log("Database URL is not provided");
    }
  } catch (err) {
    console.log(err);
  }
};

export { databaseConnection };
