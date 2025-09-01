import { Types } from "mongoose";
import { Request, Response } from "express";
import { HandleError } from "../../infrastructure/error/error";
import { SendMessageUseCase } from "../../application/sendMessage.use-case";
import { GetAllMessagesUseCase } from "../../application/getAllMessage.use-case";
import { MessageRepositoryImpl } from "../../infrastructure/database/message/message.repository.impl";
import { commonParamsZodSchema, sendMessageRequestZodSchema } from "../../infrastructure/zod/message.zod";

const messageRepositoryIml = new MessageRepositoryImpl();

const sendMessageUseCase = new SendMessageUseCase(messageRepositoryIml);
const getAllMessagesUseCase = new GetAllMessagesUseCase(messageRepositoryIml);

export class MessageController {
    constructor(
        private getAllMessagesUseCase: GetAllMessagesUseCase,
        private sendMessageUseCase: SendMessageUseCase,
    ) {
        this.getMessages = this.getMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    async getMessages(req: Request, res: Response) {
        try {
            const validateParams = commonParamsZodSchema.parse(req.params);
            const { toUserId } = validateParams;
            const fromUserId = req.user.userOrProviderId;
            const result = await this.getAllMessagesUseCase.execute({ fromUserId: new Types.ObjectId(fromUserId), toUserId: new Types.ObjectId(toUserId) });
            res.status(200).json(result);
        } catch (error) {
            HandleError.handle(error, res);
        }
    }

    async sendMessage(req: Request, res: Response) {
        try {
            const fromUserId = req.user.userOrProviderId;
            const validateParams = commonParamsZodSchema.parse(req.params);
            const { toUserId } = validateParams;
            const validateData = sendMessageRequestZodSchema.parse(req.body);
            const { text } = validateData;
            const file = req.file;
            const result = await this.sendMessageUseCase.execute({
                senderId: new Types.ObjectId(fromUserId),
                receiverId: new Types.ObjectId(toUserId),
                file: file,
                text: text
            });
            res.status(200).json(result);
        } catch (error) {
            console.log("error : ", error);
            HandleError.handle(error, res);
        }
    }
}

const messageController = new MessageController(getAllMessagesUseCase, sendMessageUseCase);
export { messageController };