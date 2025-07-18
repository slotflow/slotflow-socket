import { aws_config } from "../config/env";
import { s3Client } from "../config/aws_s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Message } from "../domain/entities/message.entity";
import { ApiResponse } from "../infrastructure/dtos/common.dto";
import { generateS3Key } from "../infrastructure/helper/generateS3Key";
import { SendMessageRequest } from "../infrastructure/dtos/message.dto";
import { generateSignedUrl } from "../infrastructure/services/s3/singedUrl.service";
import { MessageRepositoryImpl } from "../infrastructure/database/message/message.repository.impl";

export class SendMessageUseCase {
    constructor(
        private messageRepositoryImpl: MessageRepositoryImpl,
    ) { }

    async execute(payload: SendMessageRequest): Promise<ApiResponse<Message>> {

        const { senderId, receiverId, text, file } = payload;

        let imageUrl: string | undefined;
        if (file) {
            const key = generateS3Key({
                folder: "slotflow-chat-media",
                userId: senderId,
                originalname: file.originalname,
            });

            const params = {
                Bucket: aws_config.aws_s3Bucket_name,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            const upload = new Upload({
                client: s3Client,
                params: params,
            });

            const s3UploadResponse = await upload.done();
            imageUrl = s3UploadResponse?.Location;
            if (!imageUrl) throw new Error("Image sending failed");
        }


        const newMessage = await this.messageRepositoryImpl.createMessage({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        if (newMessage.image) {
            newMessage.image = await generateSignedUrl(newMessage.image);
        }

        // const receiverSocketId = getReceiverSocketId(recieverId);
        // if (receiverSocketId) {
        // io.to(receiverSocketId).emit("newMessage", newMessage);
        // }

        return { data: newMessage }

    }
}