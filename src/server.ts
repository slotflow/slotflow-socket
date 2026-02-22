import dotenv from 'dotenv';
import './infrastructure/socket/index';
import { log } from './shared/logger/logger';
import { initKafkaControllers } from './kafkaInitiator';
import connectDB from './config/database/mongodb/mongodb.config';
import { socketServer, io } from './infrastructure/socket/socket.server';

dotenv.config();

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB();
        await initKafkaControllers();

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

start();