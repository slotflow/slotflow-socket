import { Router } from 'express';
import messageRoutes from '../message/message.routes';

const router = Router();

router.use('/message', messageRoutes);

export default router;