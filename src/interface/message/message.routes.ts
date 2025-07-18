import { Router } from 'express';
import { messageController } from './message.controller';

const router = Router();

router.get('/:toUserId', messageController.getMessages);

router.get('/send/:toUserId', messageController.);

export default router;