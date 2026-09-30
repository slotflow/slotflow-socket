import { MessageModel } from "../models/message.model";
import { MessageMapper } from "../mappers/message.mapper";
import { Message } from "../../domain/entities/message.entity";
import { IMessageRepository } from "../../domain/interfaces/repositories/IMessage.repository";

export class MessageRepositoryImpl implements IMessageRepository {

    async createMessage(payload: Message): Promise<Message> {
        const persistence = MessageMapper.toPersistence(payload);
        const doc = await MessageModel.create(persistence);
        return MessageMapper.toDomain(doc);
    }

    async getAllMessages(payload: { fromUserId: string, toUserId: string}): Promise<Array<Message>> {
        const { fromUserId, toUserId } = payload;

        let messages = await MessageModel.find({
            $or: [
                { senderId: fromUserId, receiverId: toUserId },
                { senderId: toUserId, receiverId: fromUserId },
            ]
        });

        return messages.map(message => MessageMapper.toDomain(message));
    }

    async deleteMessage(payload: { _id: string; }): Promise<void> {
        await MessageModel.findByIdAndDelete(payload._id);
        return;
    }

}