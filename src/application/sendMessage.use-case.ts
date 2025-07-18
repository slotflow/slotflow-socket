import { Upload } from "@aws-sdk/lib-storage";
import { Message } from "../domain/entities/message.entity";
import { ApiResponse } from "../infrastructure/dtos/common.dto";
import { generateS3Key } from "../infrastructure/helper/generateS3Key";
import { SendMessageRequest } from "../infrastructure/dtos/message.dto";
import { MessageRepositoryImpl } from "../infrastructure/database/message/message.repository.impl";

export class SendMessageUseCase {
    constructor(
        private messageRepositoryImpl: MessageRepositoryImpl,
    ) { }

    async execute(payload: SendMessageRequest): Promise<ApiResponse<Message>> {

        const { senderId, receiverId, text, file } = payload;

        let imageUrl: string;
        if (file) {
            const key = generateS3Key({
                folder: "pixsterUsersMessageImages",
                userId: senderId,
                originalname: file.originalname,
            });

            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            const upload = new Upload({
                client: s3Client,
                params: params,
            });

            const s3UploadResponse = await upload.done();
            imageUrl = s3UploadResponse.Location;
        }


        const result = await this.messageRepositoryImpl.createMessage({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        return { data: result }

    }
}