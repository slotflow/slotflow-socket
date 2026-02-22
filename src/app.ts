import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import cookieParser from 'cookie-parser';
import { log } from './shared/logger/logger';
import messageRoutes from './presentation/message/message.routes';
import { errorHandler } from './presentation/middleware/error.middleware';

// import { serviceConfig } from './config/env';

const app = express();

// app.use(cors({
//   origin: serviceConfig.origin,
//   credentials: true,
//   allowedHeaders: ['Content-type', 'Authorization', 'Accept', 'X-Requested-with'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));

app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  log.info("getting the health check api call")
  res.status(200).json({ status: "Slotflow Socket Service Is Live" });
});

app.use('/api/message', messageRoutes);
app.use(errorHandler);

export default app;