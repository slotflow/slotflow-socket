import { Server } from "socket.io";
import { socketServer } from "../socket.server";
import { serviceConfig } from "../../../config/env";
import { registerVideoHandlers } from "./video.handler";

export const videoIo = new Server(socketServer, {
  path: "/video",
  cors: { origin: serviceConfig.frontendUrl },
});

videoIo.on("connection", (socket) => {
  registerVideoHandlers(socket, videoIo);
});
