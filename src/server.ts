import dotenv from 'dotenv';
dotenv.config();

import './infrastructure/socket/index';
import { appConfig } from './config/env';
import { initKafka } from './kafkaControl';
import { log } from './shared/logger/logger';
import { gracefulShutdown } from './shared/utils/shutDown';
import { clearRedisSocketData } from './shared/utils/eventCleaner';
import { connectDB } from './config/database/mongodb/mongodb.config';
import { socketServer, io } from './infrastructure/socket/socket.server';

const PORT = appConfig.port;

const start = async () => {
    try {
        await connectDB();
        await initKafka();
        await clearRedisSocketData();

        // The io instance is already attached to socketServer in socket.server.ts
        socketServer.listen(PORT, () => {
            log.info(`[SLOTFLOW REALTIME SERVICE] running on http://localhost:${PORT}`);
            log.info(`[SLOTFLOW REALTIME SERVICE] Socket.IO path: ${io.path()}`);
        });
    } catch (error) {
        log.error("Startup failed", error as Error);
        process.exit(1);
    }

};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

start();