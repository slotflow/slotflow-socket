import { io } from "../socket.server";
import { ChatSocketEnum } from "../enums/enums";
import { registerChatHandlers } from "./chat.handlers";

export const chatIo = io.of("/chat");

chatIo.on(ChatSocketEnum.connection, (socket) => {
  registerChatHandlers(socket, chatIo);
});
