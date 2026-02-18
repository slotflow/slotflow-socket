import { v4 as uuidv4 } from 'uuid';
import { GenerateS3KeyPayload, IS3keyGenerateService } from "../../domain/interfaces/services/IS3keyGenerateService";

export class S3KeyGenerateServiceImpl implements IS3keyGenerateService {

    constructor() { };

    generateS3Key(payload: GenerateS3KeyPayload): string {
        const { folder, userId, originalname } = payload;
        return `${folder}/${userId}/${uuidv4()}-${originalname}`;
    }

}