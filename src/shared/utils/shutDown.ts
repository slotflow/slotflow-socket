import { log } from "../logger/logger";
import { clearRedisSocketData } from "./eventCleaner";
import { stopKafka } from "../../kafkaControl";
import { socketServer } from "../../infrastructure/socket/socket.server";
import { disconnectDB } from "../../config/database/mongodb/mongodb.config";

export const gracefulShutdown = async (signal: string) => {
    try {
        log.info(`[Shutdown] Received ${signal}. Cleaning up...`);

        await disconnectDB();
        await stopKafka();
        await clearRedisSocketData();
        await new Promise((resolve) => socketServer.close(resolve));

        log.info("[Shutdown] Cleanup complete. Exiting process.");
        process.exit(0);
    } catch (error) {
        log.error("[Shutdown] Error during shutdown", error as Error);
        process.exit(1);
    }
};