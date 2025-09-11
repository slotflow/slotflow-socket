import { Router } from "express";
import { videoCallController } from "./videocall.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/validate/:roomId/:userId", AuthMiddleware, videoCallController.validateRoom);

router.get("/:roomId",AuthMiddleware, videoCallController.joinCall);

export default router;