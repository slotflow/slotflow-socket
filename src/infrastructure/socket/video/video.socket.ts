import { io } from "../socket.server";
import { registerVideoHandlers } from "./video.handler";

export const videoIo = io.of("/video");

videoIo.on("connection", (socket) => {
  registerVideoHandlers(socket, videoIo);
});
