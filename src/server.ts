import dotenv from 'dotenv';
import { log } from './shared/logger/logger';
import { initKafkaControllers } from './kafkaInitiator';
import connectDB from './config/database/mongodb/mongodb.config';
import { socketServer } from './infrastructure/socket/socket.server';

import "./infrastructure/socket/chat/chat.socket";
import "./infrastructure/socket/video/video.socket";
import "./infrastructure/socket/events/event.socket";

dotenv.config();

const PORT = process.env.PORT || 4000;

const start = async () => {
    try {
        await connectDB();
        await initKafkaControllers();
        socketServer.listen(PORT, () => {
            log.info(`RealTime Module server is on up http://localhost:${PORT}`)
        })
    } catch (error) {
        log.error("Startup failed", error as Error);
        process.exit(1);
    }

};

start();