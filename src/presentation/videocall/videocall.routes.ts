import { Router } from "express";
import { videoCallController } from "./videocall.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/:roomId",authMiddleware, videoCallController.joinCall);

export default router;