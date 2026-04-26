import { toAppError } from "../../../shared/error/handleUnknownError";
import { BadRequestError } from "../../../shared/error/appError";
import { GetAllMessageInput, GetAllMessagesOutput } from "../../dtos/common.dtos";
import { ISignedUrlService } from "../../../domain/interfaces/services/ISignedUrlService";
import { IMessageRepository } from "../../../domain/interfaces/repositories/IMessage.repository";

export class GetAllMessagesUseCase {
    constructor(
        private readonly messageRepository: IMessageRepository,
        private readonly signedUrlService: ISignedUrlService
    ) { }

    async execute(input: GetAllMessageInput): Promise<GetAllMessagesOutput> {
        try {
            const { fromUserId, toUserId } = input;
            if (!fromUserId || !toUserId) {
                throw new BadRequestError();
            }

            let messages = await this.messageRepository.getAllMessages({ fromUserId, toUserId });

            await Promise.all(
                messages.map(async (msg) => {
                    if (msg.image) {
                        const signedUrl = await this.signedUrlService.get(msg.image);
                        msg.update({ image: signedUrl });
                    }
                })
            );

            return messages;
        } catch (error: unknown) {
            throw toAppError(error, "Failed to get messages");
        }
    }
}