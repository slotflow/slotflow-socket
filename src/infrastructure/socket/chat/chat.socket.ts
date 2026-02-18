import { Server } from "socket.io";
import { socketServer } from "../socket.server";
import { registerChatHandlers } from "./chat.handlers";
import { serviceConfig } from "../../../config/env";

export const chatIo = new Server(socketServer, {
  path: "/chat",      
  cors: { origin: [serviceConfig.frontendUrl] },
});

chatIo.on("connection", (socket) => {
  registerChatHandlers(socket, chatIo);
});
