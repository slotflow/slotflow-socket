import { Server, Socket } from "socket.io";
import { redisClient } from "../../lib/redis";
import { ChatSocketEnum } from "../enums/enums";
import { log } from "../../../shared/logger/logger";

export const registerChatHandlers = async (socket: Socket, chatIo: Server) => {
  log.info("Chat socket connected");

  const queryUserId = socket.handshake.query.userId;
  const userId = typeof queryUserId === "string" ? queryUserId : null;

  if (userId) {
    await redisClient.set(`chatSocket:${userId}`, socket.id);
  }

  chatIo.emit(ChatSocketEnum.getOnlineUsers, await getOnlineUsers());

  socket.on(ChatSocketEnum.typing, async ({ fromUserId, toUserId }) => {
    const toSocketId: string | null = await redisClient.get(`chatSocket:${toUserId}`);
    if (toSocketId) chatIo.to(toSocketId).emit(ChatSocketEnum.typing, { fromUserId, toUserId });
  });

  socket.on(ChatSocketEnum.stopTyping, async ({ fromUserId, toUserId }) => {
    const toSocketId: string | null = await redisClient.get(`chatSocket:${toUserId}`);
    if (toSocketId) chatIo.to(toSocketId).emit(ChatSocketEnum.stopTyping, { fromUserId, toUserId });
  });

  socket.on(ChatSocketEnum.disconnect, async () => {
    if (userId) await redisClient.del(`chatSocket:${userId}`);
    chatIo.emit(ChatSocketEnum.getOnlineUsers, await getOnlineUsers());
  });
};

async function getOnlineUsers() {
  const keys = await redisClient.keys("chatSocket:*");
  return keys.map((key) => key.split(":")[1]);
}
