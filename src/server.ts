import dotenv from 'dotenv';
dotenv.config();

import './infrastructure/socket/index';
import { appConfig } from './config/env';
import { initDB } from './app/init/db.init';
import { log } from './shared/logger/logger';
import { initOtel } from './app/init/otel.init';
import { initKafka } from './app/init/kafka.init';
import { printText } from './shared/utils/printText';
import { setupGracefulShutdown } from './app/init/shutdown';
import { clearRedisSocketData } from './shared/utils/eventCleaner';
import { socketServer, io } from './infrastructure/socket/socket.server';

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
        log.error("Startup failed", error as Error);
        process.exit(1);
    }

};

start();