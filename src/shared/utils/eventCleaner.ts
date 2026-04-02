import { log } from "../logger/logger";
import { redisClient } from "../../infrastructure/cache/redis/redis.client";

export const clearRedisSocketData = async () => {
    try {
        let cursor = 0;
        let totalDeleted = 0;

        do {
            const [nextCursor, keys] = await redisClient.scan(cursor, {
                match: "socket:*",
                count: 100,
            });

            cursor = Number(nextCursor);

            if (keys.length > 0) {
                await redisClient.del(...keys);
                totalDeleted += keys.length;
            }

        } while (cursor !== 0);

        if (totalDeleted === 0) {
            log.info("[Redis Cleanup] No socket keys found.");
        } else {
            log.info(`[Redis Cleanup] Removed ${totalDeleted} stale socket keys.`);
        }

    } catch (error) {
        log.error("[Redis Cleanup] Failed to clear socket data", error as Error);
    }
};