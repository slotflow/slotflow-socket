import { awsConfig } from "../../config/env";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { ERROR_CODES } from "../../shared/utils/types";
import { AppError, BadRequestError } from "../../shared/error/appError";
import { IS3keyGenerateService } from "../../domain/interfaces/services/IS3keyGenerateService";
import { IS3FileUploadService, UploadFileOptions } from "../../domain/interfaces/services/IS3FileUploadService";

export class S3FileUploadServiceImpl implements IS3FileUploadService {

  constructor(
    private readonly s3: S3Client,
    private readonly s3KeyGenerateService: IS3keyGenerateService
  ) { };

  async uploadFile(input: UploadFileOptions): Promise<string> {
    try {
      const { folder, userId, file } = input;
      if (!folder || !userId || !file) {
        throw new BadRequestError();
      }

      const s3Key = this.s3KeyGenerateService.generateS3Key({
        folder,
        userId,
        originalname: file.originalname,
      });

      const params = {
        Bucket: awsConfig.awsS3BucketName,
        Key: s3Key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const upload = new Upload({
        client: this.s3,
        params,
      });

      await upload.done();

      return s3Key;

    } catch (error: unknown) {
      throw new AppError(
        "Failed to upload file",
        500,
        false,
        ERROR_CODES.INTERNAL_ERROR
      );
    }
  }
}
