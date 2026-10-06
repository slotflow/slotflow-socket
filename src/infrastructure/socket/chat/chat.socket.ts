import { io } from "../socket.server";
import { ChatSocketEnum } from "../enums/enums";
import { registerChatHandlers } from "./chat.handlers";

export const chatIo = io.of("/chat");
console.log("chatIo");

chatIo.use((socket, next) => {
  console.log("chatIo middleware");

  const headerUserId = socket.handshake.headers["x-user-id"] as string;
  const queryUserId = socket.handshake.query.userId as string;

  const userId = headerUserId ? decodeURIComponent(headerUserId) : queryUserId;

  if (!userId) {
    return next(new Error("Unauthorized: Missing User ID"));
  }

  console.log("userId attached");
  // Attach directly to socket instance for easy access anywhere
  socket.data.userId = userId;
  next();
});

chatIo.on(ChatSocketEnum.connection, (socket) => {
  console.log("chatIo connection event");
  registerChatHandlers(socket, chatIo);
});
