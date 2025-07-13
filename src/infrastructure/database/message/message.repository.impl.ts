import { IMessage, MessageModel } from "./message.model";
import { Message } from "../../../domain/entities/message.entity";
import { CommonRequest, GetAllMessage } from "../../dtos/message.dto";
import { IMessageRepository } from "../../../domain/repositories/IMessage.repository";

export class MessageRepositoryImpl implements IMessageRepository {
    private mapToEntity(message: IMessage): Message {
        return new Message(
            message._id,
            message.senderId,
            message.receiverId,
            message.text,
            message.image,
            message.createdAt,
            message.updatedAt,
        )
    }

    async getAllMessages(payload: CommonRequest): Promise<GetAllMessage> {
        const { fromUserId, toUserId } = payload;
        let messages = await MessageModel.find({
            $or: [
                { senderId: fromUserId, receiverId: toUserId },
                { senderId: toUserId, receiverId: fromUserId },
            ]
        }, {
            $project: {
                _id: 1,
                senderId: 1,
                receiverId: 1,
                text: 1,
                image: 1,
                createdAt: 1,
            }
        }).lean();

        return messages.map(message => this.mapToEntity(message));
    }

    // createMessage(): Promise<Message> {

    // }

    // deleteMessage(): Promise<ApiResponse> {

    // }
}