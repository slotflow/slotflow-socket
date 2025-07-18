import { Message } from "../entities/message.entity";
import { CommonRequest, GetAllMessageResponse, SendMessageRequestForRepository } from "../../infrastructure/dtos/message.dto";

export interface IMessageRepository {

    getAllMessages(payload: CommonRequest): Promise<GetAllMessageResponse>;
    
    createMessage(payload: SendMessageRequestForRepository): Promise<Message>;
    
    // deleteMessage(data: CommonRequest): Promise<ApiResponse>;
}