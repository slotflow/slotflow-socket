import dotenv from 'dotenv';

dotenv.config();

export const mongoConfig = {
    port: process.env.MONGODB_PORT || 5000,
    mongoURL : process.env.NODE_ENV === "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI 
}

export const redisConfig = {
    redisUrl: process.env.REDIS_URL,
    redisToken: process.env.REDIS_TOKEN
}

export const jwtConfig = {
    jwtSecret : process.env.JWT_SECRET,
}

export const aws_config = {
    aws_region: process.env.AWS_REGION,
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    aws_s3Bucket_name: process.env.AWS_S3_BUCKET_NAME,
}