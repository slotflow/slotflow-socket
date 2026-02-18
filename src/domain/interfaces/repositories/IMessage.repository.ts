import { Message } from "../../entities/message.entity";

export interface IMessageRepository {

    getAllMessages(payload: { fromUserId: string, toUserId: string}): Promise<Array<Message>>;

    createMessage(payload: Message): Promise<Message>;

    deleteMessage(payload: { _id: string }): Promise<void>;
}