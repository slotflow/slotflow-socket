import { Socket } from "socket.io";
import { eventIo } from "./event.socket";
import { EventSocketEnum } from "../enums/enums";
import { log } from "../../../shared/logger/logger";
import { redisClient } from "../../cache/redis/redis.client";
import {
  ProviderJoin,
  ProviderSubscriptionUpdatedPayload,
  SlotEngageRequest,
  StripeAccountStatusUpdatedPayload,
} from "../../../application/dtos/event.dtos";

export const registerEventHandlers = async (socket: Socket) => {
  log.info("Event socket connected");

  const userId: string = socket.data.userId;

  // Join provider room for live status / slot updates
  socket.on(EventSocketEnum.providerJoin, ({ providerId }: ProviderJoin) => {
    socket.join(`provider:${providerId}`);
  });

  // Leave provider room
  socket.on(EventSocketEnum.providerLeave, ({ providerId }: ProviderJoin) => {
    socket.leave(`provider:${providerId}`);
  });

  // handle slot engage request
  socket.on(EventSocketEnum.slotEngageRequest, async (data: SlotEngageRequest) => {
    const { providerId, date, slotId } = data;
    const slotKey = `socket:engaged:slots:slot:${providerId}:${date}:${slotId}`;
    const userEngagedSlotsKey = `socket:user:${userId || socket.id}:engaged_slots`;

    const result = await redisClient.set(slotKey, userId || socket.id, { ex: 900, nx: true });

    if (!result) {
      socket.emit(EventSocketEnum.slotEngageRejected);
      return;
    }

    await redisClient.sadd(userEngagedSlotsKey, slotKey);

    // Notify ALL OTHER users in the room that this slot is locked
    socket.to(`provider:${providerId}`).emit(EventSocketEnum.slotLocked, {
      providerId,
      date,
      slotId,
    });

    // Notify the current user that lock request succeeded
    socket.emit(EventSocketEnum.slotEngageApproved);
  });

  // Handle slot unlock request (MANUAL UNLOCK)
  socket.on(EventSocketEnum.slotUnlockRequest, async (data: SlotEngageRequest) => {
    const { providerId, date, slotId } = data;
    const slotKey = `socket:engaged:slots:slot:${providerId}:${date}:${slotId}`;
    const userEngagedSlotsKey = `socket:user:${userId || socket.id}:engaged_slots`;

    await redisClient.del(slotKey);
    await redisClient.srem(userEngagedSlotsKey, slotKey);

    // Notify ALL users in the provider room that slot is now available
    eventIo.to(`provider:${providerId}`).emit(EventSocketEnum.slotUnlocked, {
      providerId,
      date,
      slotId,
    });
  });

  // handle disconnect
  socket.on(EventSocketEnum.disconnect, async () => {
    try {
      const userKey = userId || socket.id;
      const userEngagedSlotsKey = `socket:user:${userKey}:engaged_slots`;

      // Get all slots locked by this disconnecting user
      const lockedSlots = await redisClient.smembers(userEngagedSlotsKey);

      for (const slotKey of lockedSlots) {
        await redisClient.del(slotKey);

        const parts = slotKey.split(":");
        if (parts.length >= 7) {
          const providerId = parts[4];
          const date = parts[5];
          const slotId = parts[6];

          // Broadcast unlock to everyone viewing that provider
          eventIo.to(`provider:${providerId}`).emit(EventSocketEnum.slotUnlocked, {
            providerId,
            date,
            slotId,
          });
        }
      }

      await redisClient.del(userEngagedSlotsKey);

      if (userId) {
        await redisClient.srem(`socket:eventSocket:${userId}`, socket.id);
        log.info(`Removed socketId ${socket.id} for user ${userId}`);
      }

      log.info(`Event socket disconnected: ${socket.id}`);
    } catch (error) {
      log.error(`Error during socket disconnect cleanup : ${error}`);
    }
  });
};

// emit subscription activated
export function emitSubscriptionActivated(payload: ProviderSubscriptionUpdatedPayload) {
  eventIo.to(payload.userId).emit(EventSocketEnum.subscriptionActivated, payload);
}

export function emitStripeAccountStatusUpdated(payload: StripeAccountStatusUpdatedPayload) {
  eventIo.to(payload.userId).emit(EventSocketEnum.stripeAccountStatusUpdated, payload);
}
