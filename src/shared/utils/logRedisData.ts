import { log } from "../logger/logger"
import { redisClient } from "../../infrastructure/cache/redis/redis.client";

export const logRedisData = async (keys: string[]) => {
    try {
        for (const key of keys) {
            const type = await redisClient.type(key);

            if (type === "string") {
                const value = await redisClient.get(key);
                console.log(`${key} => ${value}`);
            }

            else if (type === "set") {
                const members = await redisClient.smembers(key);
                console.log(`${key} =>`, members);
            }

            else {
                console.log(`${key} => type: ${type}`);
            }
        }
    } catch (error) {
        log.error("Redis data logging failed : ", error as Error);
    }
}