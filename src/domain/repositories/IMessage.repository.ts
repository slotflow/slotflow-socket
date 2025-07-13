import { CommonRequest, GetAllMessage } from "../../infrastructure/dtos/message.dto";

export interface IMessageRepository {

    getAllMessages(payload: CommonRequest): Promise<GetAllMessage>;
    
    // createMessage(data: CommonRequest): Promise<Message>;
    
    // deleteMessage(data: CommonRequest): Promise<ApiResponse>;
}