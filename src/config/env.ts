import dotenv from 'dotenv';
import { Validator } from '../shared/validator/validator';

dotenv.config();

const validator = new Validator();

export const appConfig = {
    port: validator.requireNumber("PORT") || 5000,
    nodeEnv: validator.requireEnv("NODE_ENV"),
};

export const serviceConfig = {
    apiGatewayUrl: appConfig.nodeEnv === "development" ? validator.requireEnv("API_GATEWAY_URL_DEV") : validator.requireEnv("API_GATEWAY_URL"),
    frontendUrl: appConfig.nodeEnv === "development" ? validator.requireEnv("FRONTEND_URL_DEV") : validator.requireEnv("FRONTEND_URL"),
    mainBackendServiceUrl: appConfig.nodeEnv === "development" ? validator.requireEnv("MAIN_BACKEND_SERVICE_URL_DEV") : validator.requireEnv("MAIN_BACKEND_SERVICE_URL"),
    notificationServiceUrl: appConfig.nodeEnv === "development" ? validator.requireEnv("NOTIFICATION_SERVICE_URL_DEV") : validator.requireEnv("NOTIFICATION_SERVICE_URL"),
    paymentServiceUrl: appConfig.nodeEnv === "development" ? validator.requireEnv("PAYMENT_SERVICE_URL_DEV") : validator.requireEnv("PAYMENT_SERVICE_URL"),
};

export const mongodbConfig = {
    mongoUri: appConfig.nodeEnv === "development" ? validator.requireEnv("MONGO_URI_DEV") : validator.requireEnv("MONGO_URI"),
};

export const redisConfig = {
    redisUrl: validator.requireEnv("REDIS_URL"),
    redisToken: validator.requireEnv("REDIS_TOKEN"),
    redisBlockListTtl: validator.requireNumber("REDIS_TTL_SECONDS_BLOCKLIST"),
    redisOtpTtl: validator.requireNumber("REDIS_TTL_SECONDS_OTP"),
    redisSignedUrlTtl: validator.requireNumber("REDIS_TTL_SECONDS_SIGNED_URL"),
};

export const jwtConfig = {
    jwtSecret: validator.requireEnv("JWT_SECRET"),
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
            planSubscribed: validator.requireEnv("KAFKA_PLAN_SUBSCRIBED"),
            slotBooked: validator.requireEnv("KAFKA_SLOT_BOOKED")

        },
        pub: {

        },
    },
};