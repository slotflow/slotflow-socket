import { Socket } from "socket.io";
import { eventIo } from "./event.socket";
import { redisClient } from "../../lib/redis";
import { EventSocketEnum } from "../enums/enums";
import { log } from "../../../shared/logger/logger";
import { ProviderSubscriptionUpdatedPayload } from "../types/event.types";

export const registerEventHandlers = async (socket: Socket) => {
  log.info("Event socket connected");

  const userId: string = socket.data.userId;

  socket.on(EventSocketEnum.disconnect, async () => {
    log.info("Event socket disconnected");
    if (userId) {
      await redisClient.srem(`eventSocket:${userId}`, socket.id);

      // consoling the eventSocket userIds
      const keys = await redisClient.keys("eventSocket:*");

      for (const key of keys) {
        const userId = key.split(":")[1];
        const socketIds = await redisClient.smembers(key);
        console.log("User:", userId, "Sockets:", socketIds);
      }
    }
  });
}

export function emitSubscriptionActivated(userId: string, payload: ProviderSubscriptionUpdatedPayload) {
  console.log("userId : ",userId);
  console.log("payload : ",payload);
  eventIo.to(userId).emit(EventSocketEnum.subscriptionActivated, payload);
};