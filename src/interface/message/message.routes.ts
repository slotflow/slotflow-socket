import { Router } from 'express';
import { messageController } from './message.controller';
import multer from 'multer';
import { AuthMiddleware } from '../middleware/auth.middleware';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.get('/:toUserId', messageController.getMessages);

router.post('/send/:toUserId',AuthMiddleware, upload.single("messageImage"), messageController.sendMessage);

export default router;