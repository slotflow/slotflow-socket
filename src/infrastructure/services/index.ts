import { s3Client } from "../cloud/aws/aws.s3.client";
import { redisClient } from "../cache/redis/redis.client";
import { S3FileUploadServiceImpl } from "./s3fileUpload.service.impl";
import { SignedUrlServiceImpl } from "./signedUrl.service.impl";
import { S3KeyGenerateServiceImpl } from "./s3KeyGenerate.service.impl";
import { ISignedUrlService } from "../../application/interfaces/services/ISignedUrl.service";
import { IS3FileUploadService } from "../../application/interfaces/services/IS3FileUpload.service";
import { IS3keyGenerateService } from "../../application/interfaces/services/IS3keyGenerate.service";

// signed url service instance
export const signedUrlService: ISignedUrlService = new SignedUrlServiceImpl(redisClient, s3Client);

// s3 key generate service instance
export const s3KeyGenerateService: IS3keyGenerateService = new S3KeyGenerateServiceImpl();

// s3 file upload service instance
export const s3FileUploadService: IS3FileUploadService = new S3FileUploadServiceImpl(
  s3Client,
  s3KeyGenerateService,
);
