import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import cookieParser from 'cookie-parser';
import messageRoutes from './interface/message/message.routes';

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ['Content-type', 'Authorization', 'Accept', 'X-Requested-with'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(helmet());
app.use(express.json({ limit:"50mb" }));
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
    console.log("getting the health check api call")
  res.status(200).json({ status: "ok" });
});

app.use('/api/message',messageRoutes);

export default app;