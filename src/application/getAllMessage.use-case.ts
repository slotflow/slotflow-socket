import { ApiResponse } from "../infrastructure/dtos/common.dto";
import { CommonRequest, GetAllMessageResponse } from "../infrastructure/dtos/message.dto";
import { MessageRepositoryImpl } from "../infrastructure/database/message/message.repository.impl";

export class GetAllMessagesUseCase {
    constructor(
        private messageRepositoryImpl: MessageRepositoryImpl
    ) { }

    async execute(payload: CommonRequest): Promise<ApiResponse<GetAllMessageResponse>> {

        const { fromUserId, toUserId } = payload;

        const result = await this.messageRepositoryImpl.getAllMessages({ fromUserId, toUserId });

        return { success: true, message: "Fetched messages", data: result }
    }
}