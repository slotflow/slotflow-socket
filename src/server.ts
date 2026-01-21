import dotenv from 'dotenv';
import { socketServer } from './infrastructure/lib/socket.io';
import connectDB from './config/database/mongodb/mongodb.config';

dotenv.config();

const PORT = process.env.PORT || 4000;

connectDB();
socketServer.listen(PORT, () => {
    console.log(`RealTime Module server is on up http://localhost:${PORT}`)
})