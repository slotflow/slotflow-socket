import app from './app';
import dotenv from 'dotenv';
import connectDB from './config/database/mongodb/mongodb.config';

dotenv.config();

const PORT = process.env.PORT || 4000;

connectDB();
app.listen(PORT, () => {
    console.log(`Chat Module server is on up http://localhost:${PORT}`)
})