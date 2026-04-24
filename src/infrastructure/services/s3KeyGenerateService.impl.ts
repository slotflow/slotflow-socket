import { v4 as uuidv4 } from 'uuid';
import { BadRequestError } from '../../shared/error/appError';
import { toAppError } from '../../shared/error/handleUnknownError';
import { GenerateS3KeyPayload, IS3keyGenerateService } from "../../domain/interfaces/services/IS3keyGenerateService";

export class S3KeyGenerateServiceImpl implements IS3keyGenerateService {

    constructor() { };

    generateS3Key(payload: GenerateS3KeyPayload): string {
        try {
            const { folder, userId, originalname } = payload;
            if (!folder || !userId || !originalname) {
                throw new BadRequestError();
            }

            return `${folder}/${userId}/${uuidv4()}-${originalname}`;
        } catch (error: unknown) {
            throw toAppError(error, "Error generating S3 Key");
        }
    }

}