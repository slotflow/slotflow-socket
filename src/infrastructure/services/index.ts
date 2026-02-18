import { s3Client } from "../lib/aws_s3";
import { redisClient } from "../lib/redis";
import { S3FileUploadServiceImpl } from "./s3fileUpload.impl";
import { SignedUrlServiceImpl } from "./signedUrlService.impl";
import { S3KeyGenerateServiceImpl } from "./s3KeyGenerateService.impl";
import { ISignedUrlService } from "../../domain/interfaces/services/ISignedUrlService";
import { IS3FileUploadService } from "../../domain/interfaces/services/IS3FileUploadService";
import { IS3keyGenerateService } from "../../domain/interfaces/services/IS3keyGenerateService";

// signed url service instance
export const signedUrlService: ISignedUrlService = new SignedUrlServiceImpl(redisClient, s3Client);

// s3 key generate service instance
export const s3KeyGenerateService: IS3keyGenerateService = new S3KeyGenerateServiceImpl();

// s3 file upload service instance
export const s3FileUploadService: IS3FileUploadService = new S3FileUploadServiceImpl(s3Client, s3KeyGenerateService);