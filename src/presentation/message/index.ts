import { messageRepository } from "../../infrastructure/repositoryImpl";
import { SendMessageUseCase } from "../../application/usecase/message/sendMessage.useCase";
import { s3FileUploadService, signedUrlService } from "../../infrastructure/services";
import { GetAllMessagesUseCase } from "../../application/usecase/message/getAllMessage.useCase";

export const getAllMessagesUseCase = new GetAllMessagesUseCase(messageRepository, signedUrlService);

export const sendMessageUseCase = new SendMessageUseCase(messageRepository, s3FileUploadService, signedUrlService);