import { log } from "../../shared/logger/logger";
import { SendMessageRequest } from "../dtos/common.dtos";
import { Message } from "../../domain/entities/message.entity";
import { chatIo } from "../../infrastructure/socket/chat/chat.socket";
import { ISignedUrlService } from "../../domain/interfaces/services/ISignedUrlService";
import { IS3FileUploadService } from "../../domain/interfaces/services/IS3FileUploadService";
import { IMessageRepository } from "../../domain/interfaces/repositories/IMessage.repository";
import { getReceiverSocketId } from "../../infrastructure/socket/chat/chat.handlers";

export class SendMessageUseCase {
    constructor(
        private readonly messageRepository: IMessageRepository,
        private readonly s3FileUploadServiceImpl: IS3FileUploadService,
        private readonly signedUrlService: ISignedUrlService
    ) { };

    async execute(payload: SendMessageRequest): Promise<Message> {
        try {
            const { senderId, receiverId, text, file } = payload;

            let imageKey: string | undefined;
            if (file) {
                imageKey = await this.s3FileUploadServiceImpl.uploadFile({
                    folder: `slotflow-chat-${senderId + "to" + receiverId}`,
                    userId: senderId.toString(),
                    file: file,
                });
            }

            const messageData = Message.create({
                senderId,
                receiverId,
                text,
                image: imageKey
            });

            const newMessage = await this.messageRepository.createMessage(messageData);

            if (imageKey) {
                newMessage.update({ image: await this.signedUrlService.save(imageKey) });
            }

            const receiverSocketId = await getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                chatIo.to(receiverSocketId).emit("newMessage", newMessage);
            }

            return newMessage
        } catch (error) {
            log.error(`SendMessageUseCase failed : ${error}`);
            throw error;
        }

    }
}