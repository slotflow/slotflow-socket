import dotenv from 'dotenv';
import { Validator } from '../shared/validator/validator';

dotenv.config();

const validator = new Validator();

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