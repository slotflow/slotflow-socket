import { eventIo } from "./event.socket";
import { Server, Socket } from "socket.io";
import { redisClient } from "../../lib/redis";
import { log } from "../../../shared/logger/logger";
import { ProviderSubscriptionUpdatedPayload } from "../types/event.types";

export const registerEventHandlers = async (socket: Socket, eventIo: Server) => {
  log.info("Event socket connected");

  const queryUserId = socket.handshake.query.userId;
  const userId = typeof queryUserId === "string" ? queryUserId : null;

  if (userId) {
    await redisClient.set(`eventSocket:${userId}`, socket.id);
    socket.join(userId);
  }

  socket.on("disconnect", async () => {
    log.info("Event socket disconnected");
    if (userId) {
      await redisClient.del(`eventSocket:${userId}`);
    }
  });
}

export function emitSubscriptionActivated(userId: string, payload: ProviderSubscriptionUpdatedPayload) {
  eventIo.to(userId).emit("subscription:activated", payload);
}