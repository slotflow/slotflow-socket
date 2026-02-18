import { log } from "../../shared/logger/logger";
import { NextFunction, Request, Response } from "express";
import { getAllMessagesUseCase, sendMessageUseCase } from ".";
import { DecodedUser } from "../../application/dtos/common.dtos";
import { SendMessageUseCase } from "../../application/message/sendMessage.useCase";
import { getAllMessageSchema, sendMessageSchema } from "../../shared/zod/message.zod";
import { GetAllMessagesUseCase } from "../../application/message/getAllMessage.useCase";

class MessageController {
    constructor(
        private readonly getAllMessagesUseCase: GetAllMessagesUseCase,
        private readonly sendMessageUseCase: SendMessageUseCase,
    ) {
        this.getMessages = this.getMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    async getMessages(req: Request, res: Response, next: NextFunction) {
        try {
            const validatedData = getAllMessageSchema.parse({
                fromUserId: (req.user as DecodedUser).userOrProviderId,
                toUserId: req.params.toUserId
            })
            const result = await this.getAllMessagesUseCase.execute(validatedData);
            res.status(200).json(result);
        } catch (error) {
            log.error("getMessages failed : ",error as Error);
            next(error);
        }
    }

    async sendMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const validatedData = sendMessageSchema.parse({
                senderId: (req.user as DecodedUser).userOrProviderId,
                receiverId: req.params.toUserId,
                file: req.file,
                text: req.body.text
            });
            const result = await this.sendMessageUseCase.execute(validatedData);
            res.status(200).json(result);
        } catch (error) {
            log.error("sendMessage error : ",error as Error);
            next(error);
        }
    }
}

export const messageController = new MessageController(
    getAllMessagesUseCase,
    sendMessageUseCase
);
