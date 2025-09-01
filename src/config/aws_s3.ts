import { aws_config } from './env';
import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: aws_config.aws_region!,
  credentials: {
    accessKeyId: aws_config.aws_access_key_id!,
    secretAccessKey: aws_config.aws_secret_access_key!,
  },
});

export { s3Client };
