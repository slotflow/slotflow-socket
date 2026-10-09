import jwt from "jsonwebtoken";
import { io } from "../socket.server";
import { jwtConfig } from "../../../config/env";
import { EventSocketEnum } from "../enums/enums";
import { log } from "../../../shared/logger/logger";
import { registerEventHandlers } from "./event.handlers";
import { redisClient } from "../../cache/redis/redis.client";
import { AccessTokenPayload } from "../../../shared/utils/types/types";
import { logRedisData } from "../../../shared/utils/helpers/logRedisData";
import { extractTokenFromCookie } from "../../../shared/utils/helpers/extractTokenFromCookie";

export const eventIo = io.of("/events");

eventIo.use(async (socket, next) => {
  try {
    const cookie = socket.handshake.headers.cookie;

    if (!cookie) {
      return next(new Error("Unauthorized - no cookie"));
    }

    const token = extractTokenFromCookie(cookie, "token");

    if (!token) {
      return next(new Error("Unauthorized - no token"));
    }

    let decoded: AccessTokenPayload;

    try {
      decoded = jwt.verify(token, jwtConfig.jwtSecret) as AccessTokenPayload;
    } catch (err: unknown) {
      if (err instanceof jwt.TokenExpiredError) {
        return next(new Error("TOKEN_EXPIRED"));
      }
      return next(new Error("Unauthorized"));
    }

    const userId = decoded.userId;

    if (!userId) {
      return next(new Error("Unauthorized - invalid payload"));
    }

    socket.data.userId = userId;
    socket.data.tokenExp = decoded.exp; // store expiry if needed

    // Store socket ID
    await redisClient.sadd(`socket:eventSocket:${userId}`, socket.id);

    // consoling redisClient eventSocket userIds
    const keys = await redisClient.keys("eventSocket:*");
    await logRedisData(keys);

    // Join user room
    socket.join(userId);

    next();
  } catch (error) {
    log.error("Socket auth failed", { error });
    next(new Error("Unauthorized"));
  }
});

eventIo.on(EventSocketEnum.connection, (socket) => {
  registerEventHandlers(socket);
});
