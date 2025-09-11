import { Types } from "mongoose";
import { Request, Response } from "express";
import { aws_config } from "../../config/env";
import { S3Client } from "@aws-sdk/client-s3";
import { HandleError } from "../../infrastructure/error/error";
import { S3KeyGenerator } from "../../infrastructure/helper/generateS3Key";
import { SendMessageUseCase } from "../../application/sendMessage.use-case";
import { FileUploadService } from "../../infrastructure/services/s3/fileUpload";
import { GetAllMessagesUseCase } from "../../application/getAllMessage.use-case";
import { SignedUrlService } from "../../infrastructure/services/s3/singedUrl.service";
import { RandomStringGenerator } from "../../infrastructure/helper/generateRandomString";
import { MessageRepositoryImpl } from "../../infrastructure/database/message/message.repository.impl";
import { commonParamsZodSchema, sendMessageRequestZodSchema } from "../../infrastructure/zod/message.zod";
import { SignedUrlRepositoryImpl } from "../../infrastructure/database/singedUrl/signedUrlCacheRepositoryImpl";

const s3Client = new S3Client();
const messageRepositoryIml = new MessageRepositoryImpl();
const signedUrlCacheRepositoryImpl = new SignedUrlRepositoryImpl();
const randomStringGenerator = new RandomStringGenerator();
const s3KeyGenerator = new S3KeyGenerator(randomStringGenerator);
const signedUrlService = new SignedUrlService(aws_config.aws_s3Bucket_name, signedUrlCacheRepositoryImpl);
const fileUploadService = new FileUploadService(s3Client, signedUrlService, s3KeyGenerator);

const sendMessageUseCase = new SendMessageUseCase(messageRepositoryIml, signedUrlService, fileUploadService);
const getAllMessagesUseCase = new GetAllMessagesUseCase(messageRepositoryIml, signedUrlService);

class MessageController {
    constructor(
        private getAllMessagesUseCase: GetAllMessagesUseCase,
        private sendMessageUseCase: SendMessageUseCase,
    ) {
        this.getMessages = this.getMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    async getMessages(req: Request, res: Response) {
        try {
            const validateParams = commonParamsZodSchema.parse(req.params);
            const { toUserId } = validateParams;
            const fromUserId = req.user.userOrProviderId;
            const result = await this.getAllMessagesUseCase.execute({ fromUserId: new Types.ObjectId(fromUserId), toUserId: new Types.ObjectId(toUserId) });
            res.status(200).json(result);
        } catch (error) {
            HandleError.handle(error, res);
        }
    }

    async sendMessage(req: Request, res: Response) {
        try {
            const fromUserId = req.user.userOrProviderId;
            const validateParams = commonParamsZodSchema.parse(req.params);
            const { toUserId } = validateParams;
            const validateData = sendMessageRequestZodSchema.parse(req.body);
            const { text } = validateData;
            const file = req.file;
            const result = await this.sendMessageUseCase.execute({
                senderId: new Types.ObjectId(fromUserId),
                receiverId: new Types.ObjectId(toUserId),
                file: file,
                text: text
            });
            res.status(200).json(result);
        } catch (error) {
            console.log("error : ", error);
            HandleError.handle(error, res);
        }
    }
}

const messageController = new MessageController(getAllMessagesUseCase, sendMessageUseCase);
export { messageController };