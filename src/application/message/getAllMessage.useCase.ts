import { log } from "../../shared/logger/logger";
import { GetAllMessageRequest, GetAllMessagesResponse } from "../dtos/common.dtos";
import { ISignedUrlService } from "../../domain/interfaces/services/ISignedUrlService";
import { IMessageRepository } from "../../domain/interfaces/repositories/IMessage.repository";

export class GetAllMessagesUseCase {
    constructor(
        private readonly messageRepository: IMessageRepository,
        private readonly signedUrlService: ISignedUrlService
    ) { }

    async execute(payload: GetAllMessageRequest): Promise<GetAllMessagesResponse> {

        const { fromUserId, toUserId } = payload;
        try {

            let result = await this.messageRepository.getAllMessages({ fromUserId, toUserId });

            await Promise.all(
                result.map(async (msg) => {
                    if (msg.image) {
                        const signedUrl = await this.signedUrlService.get(msg.image);
                        msg.update({ image: signedUrl });
                    }
                })
            );

            return result
        } catch (error) {
            log.error("GetAllMessagesUseCase failed : ", error as Error);
            throw error;
        }
    }
}