import { SendMessageRequest } from "../../dtos/common.dtos";
import { BadRequestError } from "../../../shared/error/appError";
import { Message } from "../../../domain/entities/message.entity";
import { toAppError } from "../../../shared/error/handleUnknownError";
import { chatIo } from "../../../infrastructure/socket/chat/chat.socket";
import { getReceiverSocketId } from "../../../infrastructure/socket/chat/chat.handlers";
import { ISignedUrlService } from "../../../domain/interfaces/services/ISignedUrlService";
import { IS3FileUploadService } from "../../../domain/interfaces/services/IS3FileUploadService";
import { IMessageRepository } from "../../../domain/interfaces/repositories/IMessage.repository";

export class SendMessageUseCase {
    constructor(
        private readonly messageRepository: IMessageRepository,
        private readonly s3FileUploadServiceImpl: IS3FileUploadService,
        private readonly signedUrlService: ISignedUrlService
    ) { };

    async execute(payload: SendMessageRequest): Promise<Message> {
        try {
            const { senderId, receiverId, text, file } = payload;
            if (!senderId || !receiverId || (!text && !file)) {
                throw new BadRequestError("Sender, Receiver, and content (text or file) are required");
            }

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
        } catch (error: unknown) {
            throw toAppError(error, "Failed to send message");
        }
    }
}