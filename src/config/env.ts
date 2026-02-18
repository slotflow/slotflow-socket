import dotenv from 'dotenv';
import { Validator } from '../shared/validator/validator';

dotenv.config();

const validator = new Validator();

export const mongoConfig = {
    port: validator.requireNumber("MONGODB_PORT") || 5000,
    mongoURL : validator.requireEnv("NODE_ENV") === "development" ? validator.requireEnv("MONGO_URI_DEV") : validator.requireEnv("MONGO_URI") 
}

export const redisConfig = {
    redisUrl: validator.requireEnv("REDIS_URL"),
    redisToken: validator.requireEnv("REDIS_TOKEN"),
    redisBlockListTtl: validator.requireNumber("REDIS_TTL_SECONDS_BLOCKLIST"),
    redisOtpTtl: validator.requireNumber("REDIS_TTL_SECONDS_OTP"),
    redisSignedUrlTtl: validator.requireNumber("REDIS_TTL_SECONDS_SIGNED_URL"),
};

export const jwtConfig = {
    jwtSecret : validator.requireEnv("JWT_SECRET"),
}

export const awsConfig = {
    awsAccessKeyId: validator.requireEnv("AWS_ACCESS_KEY_ID"),
    awsSecretAccessKey: validator.requireEnv("AWS_SECRET_ACCESS_KEY"),
    awsRegion: validator.requireEnv("AWS_REGION"),
    awsS3BucketName: validator.requireEnv("AWS_S3_BUCKET_NAME"),
    awsUrlExpires: validator.requireNumber("AWS_URL_EXPIRY_SECONDS"),
}

export const kafkaConfig = {
    clientId: validator.requireEnv("KAFKA_CLIENT_ID"),

    groups: {
        groupId: validator.requireEnv("KAFKA_GROUP_ID"),
    },

    brokers: [
        validator.requireEnv("KAFKA_BROKER_1"),
        validator.requireEnv("KAFKA_BROKER_2"),
        validator.requireEnv("KAFKA_BROKER_3"),
    ],

    topics: {
        sub: {
            providerSubscriptionPaymentSuccess: validator.requireEnv("KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_SUCCESS"),
        },
        pub: {
            
        },
    },
};