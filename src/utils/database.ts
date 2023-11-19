import mongoose from "mongoose";
import logger from "./logger";

async function database() {
  try {
    return await mongoose.connect('mongodb://root:admin123@localhost:27017/?authMechanism=DEFAULT')
  } catch (error) {
    logger.error('Failed to connect to database')
  }
}

export default database