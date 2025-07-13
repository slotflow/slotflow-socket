import { Message } from "../entities/message.entity";
import { ApiResponse } from "../../infrastructure/dtos/common.dto";

export interface IMessageRepository {

    createMessage(): Promise<Message>;

    deleteMessage(): Promise<ApiResponse>;

    getAllMessages(): Promise<Array<Message>>;
}