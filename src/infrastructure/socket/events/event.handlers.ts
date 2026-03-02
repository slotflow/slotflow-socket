import { Socket } from "socket.io";
import { eventIo } from "./event.socket";
import { redisClient } from "../../lib/redis";
import { EventSocketEnum } from "../enums/enums";
import { log } from "../../../shared/logger/logger";
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

    const existing = await redisClient.get(`engaged:slots:${key}`);

    if (existing) {
      socket.emit(EventSocketEnum.slotEngageRejected);
      return;
    }

    await redisClient.set(`engaged:slots:${key}`, userId, { ex: 600 });

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

    await redisClient.del(`engaged:slots:${key}`);

    eventIo.to(`provider:${providerId}`).emit(EventSocketEnum.slotUnlocked, {
      providerId,
      date,
      slotId
    });
  });


  // handle disconnect
  socket.on(EventSocketEnum.disconnect, async () => {
    log.info("Event socket disconnected");
    if (userId) {
      await redisClient.srem(`eventSocket:${userId}`, socket.id);

      const keys = await redisClient.keys("eventSocket:*");

      for (const key of keys) {
        const userId = key.split(":")[1];
        const socketIds = await redisClient.smembers(key);
        console.log("User:", userId, "Sockets:", socketIds);
      }
    }
  });
}


// emit subscription activated
export function emitSubscriptionActivated(userId: string, payload: ProviderSubscriptionUpdatedPayload) {
  eventIo.to(userId).emit(EventSocketEnum.subscriptionActivated, payload);
};