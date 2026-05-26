import { IdType } from '../../shared/utils/types';
import { generateId } from '../../shared/utils/generateId';
import { BadRequestError } from '../../shared/error/appError';
import { toAppError } from '../../shared/error/handleUnknownError';
import { GenerateS3KeyPayload, IS3keyGenerateService } from "../../domain/interfaces/services/IS3keyGenerateService";

export class S3KeyGenerateServiceImpl implements IS3keyGenerateService {

    constructor() { };

    generateS3Key(input: GenerateS3KeyPayload): string {
        try {
            const { folder, userId, originalname } = input;
            if (!folder || !userId || !originalname) {
                throw new BadRequestError();
            }

            return `${folder}/${userId}/${generateId(IdType.FILE)}-${originalname}`;
        } catch (error: unknown) {
            throw toAppError(error, "Error generating S3 Key");
        }
    }

}