export const mongoConfig = {
    port: process.env.MONGODB_PORT || 5000,
    mongoURL : process.env.NODE_ENV !== "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI 
}

export const redisConfig = {
    redisUrl: process.env.REDIS_URL,
    redisToken: process.env.REDIS_TOKEN
}

export const jwtConfig = {
    jwtSecret : process.env.JWT_SECRET,
}