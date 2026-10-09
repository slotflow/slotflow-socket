import "dotenv/config";
import "./infrastructure/socket/index";
import { appConfig } from "./config/env";
import { initDB } from "./app/init/db.init";
import { log } from "./shared/logger/logger";
import { initOtel } from "./app/init/otel.init";
import { initKafka } from "./app/init/kafka.init";
import { setupGracefulShutdown } from "./app/init/shutdown";
import { printText } from "./shared/utils/helpers/printText";
import { socketServer, io } from "./infrastructure/socket/socket.server";
import { clearRedisSocketData } from "./shared/utils/helpers/eventCleaner";

const PORT = appConfig.port;

const start = async () => {
  try {
    await initOtel();
    await initDB();
    await initKafka();
    await clearRedisSocketData();

    socketServer.listen(PORT, () => {
      printText();
      log.info(`Live on http://localhost:${PORT}`);
      log.info(`Socket.IO path: ${io.path()}`);
    });

    setupGracefulShutdown(socketServer);
  } catch (error) {
    log.error("Startup failed", { error });
    process.exit(1);
  }
};

start();
