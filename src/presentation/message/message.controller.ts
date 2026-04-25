import { log } from "../../shared/logger/logger";
import { NextFunction, Request, Response } from "express";
import { getAllMessagesUseCase, sendMessageUseCase } from ".";
import { DecodedUser } from "../../application/dtos/common.dtos";
import { getAllMessageSchema, sendMessageSchema } from "../../shared/zod/message.zod";
import { SendMessageUseCase } from "../../application/usecase/message/sendMessage.useCase";
import { GetAllMessagesUseCase } from "../../application/usecase/message/getAllMessage.useCase";

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
            const user = req.user as DecodedUser;
            const validatedData = getAllMessageSchema.parse({
                toUserId: req.params.toUserId
            })
            const result = await this.getAllMessagesUseCase.execute({
                ...validatedData,
                fromUserId: user.id
            });
            res.status(200).json(result);
        } catch (error) {
            log.error("getMessages failed : ", error as Error);
            next(error);
        }
    }

    async sendMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as DecodedUser;
            const validatedData = sendMessageSchema.parse({
                receiverId: req.params.toUserId,
                file: req.file,
                text: req.body.text
            });
            const result = await this.sendMessageUseCase.execute({
                ...validatedData,
                senderId: user.id
            });
            res.status(200).json(result);
        } catch (error) {
            log.error("sendMessage error : ", error as Error);
            next(error);
        }
    }
}

export const messageController = new MessageController(
    getAllMessagesUseCase,
    sendMessageUseCase
);
