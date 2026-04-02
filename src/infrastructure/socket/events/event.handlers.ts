import { Socket } from "socket.io";
import { eventIo } from "./event.socket";
import { redisClient } from "../../cache/redis/redis.client";
import { EventSocketEnum } from "../enums/enums";
import { log } from "../../../shared/logger/logger";
import { logRedisData } from "../../../shared/utils/logRedisData";
import { ProviderJoin, ProviderSubscriptionUpdatedPayload, SlotEngageRequest } from "../types/event.types";

export const registerEventHandlers = async (socket: Socket) => {
  log.info("Event socket connected");

  const userId: string = socket.data.userId;

  // join room for provider service availability live check
  socket.on(EventSocketEnum.providerJoin, ({ providerId }: ProviderJoin) => {
    socket.join(`provider:${providerId}`);
  });

  // handle slot engage request
  socket.on(EventSocketEnum.slotEngageRequest, async (data: SlotEngageRequest) => {
    const { providerId, date, slotId } = data;

    const key = `slot:${providerId}:${date}:${slotId}`;

    // const existing = await redisClient.get(`engaged:slots:${key}`);
    const result = await redisClient.set(`socket:engaged:slots:${key}`, userId, { ex: 600, nx: true });

    if (!result) {
      socket.emit(EventSocketEnum.slotEngageRejected);
      return;
    }


    const keys = await redisClient.keys(`socket:engaged:slots:${key}`);
    await logRedisData(keys)

    eventIo.to(`provider:${providerId}`).emit(EventSocketEnum.slotLocked, {
      providerId,
      date,
      slotId
    });

    socket.emit(EventSocketEnum.slotEngageApproved);
  });


  // leave room for provider service availability live check
  socket.on(EventSocketEnum.providerLeave, ({ providerId }: ProviderJoin) => {
    socket.leave(`provider:${providerId}`);
  });

  socket.on(EventSocketEnum.slotUnlockRequest, async (data: SlotEngageRequest) => {
    const { providerId, date, slotId } = data;

    const key = `slot:${providerId}:${date}:${slotId}`;

    await redisClient.del(`socket:engaged:slots:${key}`);

    eventIo.to(`provider:${providerId}`).emit(EventSocketEnum.slotUnlocked, {
      providerId,
      date,
      slotId
    });
  });


  // handle disconnect
  socket.on(EventSocketEnum.disconnect, async () => {
    if (userId) {

      const keys = await redisClient.keys(`socket:eventSocket:${userId}`);
      await logRedisData(keys);

      await redisClient.srem(`socket:eventSocket:${userId}`, socket.id);
      log.info("Removed socketId of the user")

      await logRedisData(keys);

      log.info("Event socket disconnected");
    }
  });
}


// emit subscription activated
export function emitSubscriptionActivated(userId: string, payload: ProviderSubscriptionUpdatedPayload) {
  eventIo.to(userId).emit(EventSocketEnum.subscriptionActivated, payload);
};