import mongoose from "mongoose";
import logger from "./logger";
import env from 'dotenv'

env.config()

async function database() {
  try {
    return await mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017/?authMechanism=DEFAULT`)
  } catch (error) {
    logger.error('Failed to connect to database')
    console.error(error)
  }
}

export default database