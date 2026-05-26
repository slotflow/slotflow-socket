import multer from 'multer';
import { Router } from 'express';
import { messageController } from './message.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.get('/:toUserId',authMiddleware, messageController.getMessages);

router.post('/send/:toUserId',authMiddleware, upload.single("messageImage"), messageController.sendMessage);

export default router;