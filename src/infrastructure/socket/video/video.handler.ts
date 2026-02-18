import { Server, Socket } from "socket.io";
import { VideoSocketEnum } from "../enums/enums";
import { log } from "../../../shared/logger/logger";

export const registerVideoHandlers = (socket: Socket, videoIo: Server) => {
  log.info(`Video socket connected: ${socket.id}`);

  socket.on(VideoSocketEnum.roomJoin, ({ roomId, user }) => {
    socket.join(roomId);
    socket.to(roomId).emit(VideoSocketEnum.userJoined, { id: socket.id, user });
  });

  socket.on(VideoSocketEnum.userCall, ({ to, offer }) => {
    videoIo.to(to).emit(VideoSocketEnum.incomingCall, { from: socket.id, offer });
  });

  socket.on(VideoSocketEnum.callAccepted, ({ to, ans }) => {
    videoIo.to(to).emit(VideoSocketEnum.callAccepted, { from: socket.id, ans });
  });

  socket.on(VideoSocketEnum.peerNegotiation, ({ to, offer }) => {
    videoIo.to(to).emit(VideoSocketEnum.peerNegotiation, { from: socket.id, offer });
  });

  socket.on(VideoSocketEnum.peerNegotiationDone, ({ to, ans }) => {
    videoIo.to(to).emit(VideoSocketEnum.peerNegotiationFinal, { from: socket.id, ans });
  });

  socket.on(VideoSocketEnum.roomLeave, ({ roomId }) => {
    socket.leave(roomId);
    socket.to(roomId).emit(VideoSocketEnum.userLeft, { id: socket.id });
  });

  socket.on(VideoSocketEnum.disconnect, () => {
    log.info(`Video socket disconnected: ${socket.id}`);
  });
};
