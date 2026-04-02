import { stopDB } from "./db.init";
import { stopOtel } from "./otel.init";
import { stopKafka } from "./kafka.init";
import { log } from "../../shared/logger/logger";
import { IncomingMessage, Server, ServerResponse } from "http";
import { clearRedisSocketData } from "../../shared/utils/eventCleaner";
import { socketServer } from "../../infrastructure/socket/socket.server";

export const setupGracefulShutdown = async (server: Server<typeof IncomingMessage, typeof ServerResponse>) => {
  const shutdown = async () => {
    log.info("Shutting down...");

    try {
        await stopKafka();
        await stopDB();
        await stopOtel();
        await clearRedisSocketData();
        await new Promise((resolve) => socketServer.close(resolve));

      server.close(() => {
        log.info("Server closed");
        process.exit(0);
      });

    } catch (err) {
      log.error("Shutdown error", err as Error);
      process.exit(1);
    }
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};