import mongoose from 'mongoose';
import { mongodbConfig } from '../../env';
import { log } from '../../../shared/logger/logger';

export const connectDB = async () => {
    try {
        await mongoose.connect(mongodbConfig.mongoUri);
        log.info("MngoDB Connected...");
    } catch (error) {
        log.error("MongoDB Connection Failed : ", error as Error);
        throw new Error("Databse connection failed");
    }
}

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        log.info("MongoDB Disconnected...")
    } catch (error) {
        log.error("MongoDB disconnecting Failed : ", error as Error);
        throw new Error("Database disconnect failed")
    }
}