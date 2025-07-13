import { MessageRepositoryImpl } from "../../infrastructure/database/message/message.repository.impl";
import { ApiResponse } from "../../infrastructure/dtos/common.dto";
import { CommonRequest, GetAllMessage } from "../../infrastructure/dtos/message.dto";

export class GetAllMessagesUseCase {
    constructor(
        private messageRepositoryImpl: MessageRepositoryImpl
    ) { }

    async execute(payload: CommonRequest): Promise<ApiResponse<GetAllMessage>> {

        const { fromUserId, toUserId } = payload;

        const result = await this.messageRepositoryImpl.getAllMessages({ fromUserId, toUserId });

        return { data: result }
    }
}