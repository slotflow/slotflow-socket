import { Namespace, Socket } from "socket.io";
import { VideoSocketEnum } from "../enums/enums";
import { log } from "../../../shared/logger/logger";

export const registerVideoHandlers = (socket: Socket, videoIo: Namespace) => {
  log.info(`Video socket connected: ${socket.id}`);

  socket.on(VideoSocketEnum.roomJoin, ({ roomId, user }) => {
    log.info(`room join user : ${JSON.stringify(user)}, roomId: ${roomId}`);
    socket.join(roomId);
    socket.to(roomId).emit(VideoSocketEnum.userJoined, { id: socket.id, user });
  });

  socket.on(VideoSocketEnum.userCall, ({ to, offer }) => {
    log.info(`user call to : ${to}, offer: ${offer}`);
    videoIo.to(to).emit(VideoSocketEnum.incomingCall, { from: socket.id, offer });
  });

  socket.on(VideoSocketEnum.callAccepted, ({ to, ans }) => {
    log.info(`call accepted to : ${to}, ans: ${ans}`);
    videoIo.to(to).emit(VideoSocketEnum.callAccepted, { from: socket.id, ans });
  });

  socket.on(VideoSocketEnum.peerNegotiation, ({ to, offer }) => {
    log.info(`peer negotiation to : ${to}, offer: ${offer}`);
    videoIo.to(to).emit(VideoSocketEnum.peerNegotiation, { from: socket.id, offer });
  });

  socket.on(VideoSocketEnum.peerNegotiationDone, ({ to, ans }) => {
    log.info(`peer negotiation done to : ${to}, ans: ${ans}`);
    videoIo.to(to).emit(VideoSocketEnum.peerNegotiationFinal, { from: socket.id, ans });
  });

  socket.on(VideoSocketEnum.roomLeave, ({ roomId }) => {
    log.info(`room leave roomId: ${roomId}`);
    socket.leave(roomId);
    socket.to(roomId).emit(VideoSocketEnum.userLeft, { id: socket.id });
  });

  socket.on(VideoSocketEnum.disconnect, () => {
    log.info(`Video socket disconnected: ${socket.id}`);
  });
};
