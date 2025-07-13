import { Request, Response } from "express";
import { HandleError } from "../../infrastructure/error/error";
import { GetAllMessagesUseCase } from "../../application/message-use.case/message.use-case";
import { MessageRepositoryImpl } from "../../infrastructure/database/message/message.repository.impl";
import { Types } from "mongoose";
import { getAllMessagesParams } from "../../infrastructure/zod/message.zod";

const messageRepositoryIml = new MessageRepositoryImpl();
const getAllMessagesUseCase = new GetAllMessagesUseCase(messageRepositoryIml);

export class MessageController {
    constructor(
        private getAllMessagesUseCase: GetAllMessagesUseCase,
    ) {
        this.getMessages = this.getMessages.bind(this);
    }

    async getMessages(req:Request, res: Response) {
        try {
            const validateParams = getAllMessagesParams.parse(req.params);
            const { toUserId } = validateParams;
            const fromUserId = req.user.userOrProviderId;
            const result = await this.getAllMessagesUseCase.execute({ fromUserId: new Types.ObjectId(fromUserId), toUserId: new Types.ObjectId(toUserId)})
            res.status(200).json(result);
        } catch (error) {
            HandleError.handle(error, res);
        }
    }
}

const messageController = new MessageController( getAllMessagesUseCase );
export { messageController };