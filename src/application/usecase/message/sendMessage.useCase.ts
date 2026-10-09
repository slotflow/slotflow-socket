import { BadRequestError } from "../../../shared/error/appError";
import { Message } from "../../../domain/entities/message.entity";
import { toAppError } from "../../../shared/error/handleUnknownError";
import { chatIo } from "../../../infrastructure/socket/chat/chat.socket";
import { ChatSocketEnum } from "../../../infrastructure/socket/enums/enums";
import { SendMessageInput, SendMessageOutput } from "../../dtos/common.dtos";
import { ISignedUrlService } from "../../interfaces/services/ISignedUrl.service";
import { IS3FileUploadService } from "../../interfaces/services/IS3FileUpload.service";
import { getReceiverSocketId } from "../../../infrastructure/socket/chat/chat.handlers";
import { IMessageRepository } from "../../../domain/interfaces/repositories/IMessage.repository";

export class SendMessageUseCase {
  constructor(
    private readonly messageRepository: IMessageRepository,
    private readonly s3FileUploadServiceImpl: IS3FileUploadService,
    private readonly signedUrlService: ISignedUrlService,
  ) {}

  async execute(input: SendMessageInput): Promise<SendMessageOutput> {
    try {
      const { senderId, receiverId, text, file } = input;
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
        image: imageKey,
      });

      const createdMessage = await this.messageRepository.createMessage(messageData);

      if (imageKey) {
        createdMessage.update({ image: await this.signedUrlService.save(imageKey) });
      }

      const receiverSocketId = await getReceiverSocketId(receiverId);

      const newMessage = createdMessage.getProps();

      if (receiverSocketId) {
        chatIo.to(receiverSocketId).emit(ChatSocketEnum.newMessage, newMessage);
      }

      return {
        ...newMessage,
      };
    } catch (error: unknown) {
      throw toAppError(error, "Failed to send message");
    }
  }
}
