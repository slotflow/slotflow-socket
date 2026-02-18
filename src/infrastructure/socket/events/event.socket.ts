import { Server } from "socket.io";
import { socketServer } from "../socket.server";
import { serviceConfig } from "../../../config/env";
import { registerEventHandlers } from "./event.handlers";

export const eventIo = new Server(socketServer, {
  path: "/events",
  cors: { origin: [serviceConfig.frontendUrl] },
});

eventIo.on("connection", (socket) => {
  registerEventHandlers(socket, eventIo)
});
