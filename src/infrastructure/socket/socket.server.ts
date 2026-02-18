import http from "http";
import app from "../../app";
import { redisClient } from "../lib/redis";

export const socketServer = http.createServer(app);

export async function getReceiverSocketId(userId: string): Promise<string | null> {
    return await redisClient.get(`chatSocket:${userId}`);
}