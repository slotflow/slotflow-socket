import { messageRepository } from "../../infrastructure/repositoryImpl";
import { SendMessageUseCase } from "../../application/message/sendMessage.useCase";
import { s3FileUploadService, signedUrlService } from "../../infrastructure/services";
import { GetAllMessagesUseCase } from "../../application/message/getAllMessage.useCase";

export const getAllMessagesUseCase = new GetAllMessagesUseCase(messageRepository, signedUrlService);

export const sendMessageUseCase = new SendMessageUseCase(messageRepository, s3FileUploadService, signedUrlService);