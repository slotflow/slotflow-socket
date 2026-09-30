import { Namespace, Socket } from "socket.io";
import { VideoSocketEnum } from "../enums/enums";
import { log } from "../../../shared/logger/logger";
import { VideoRoomUser } from "../../../application/dtos/event.dtos";

const lobbyRoomId = (roomId: string) => `video-lobby:${roomId}`;

// Get everyone currently connected to the actual video room.
// This is used whenever the lobby needs an updated list of participants.
const getRoomParticipants = async (roomId: string, videoIo: Namespace) => {
  const roomSockets = await videoIo.in(roomId).fetchSockets();

  return roomSockets.map((roomSocket) => ({
    id: roomSocket.id,
    user: roomSocket.data.videoUser as VideoRoomUser | undefined,
  }));
};

// Keep users watching the lobby in sync with the current room participants.
const broadcastRoomState = async (roomId: string, videoIo: Namespace) => {
  const users = await getRoomParticipants(roomId, videoIo);
  videoIo.to(lobbyRoomId(roomId)).emit(VideoSocketEnum.roomState, { roomId, users });
};

export const registerVideoHandlers = (socket: Socket, videoIo: Namespace) => {
  log.info(`Video socket connected: ${socket.id}`);

  // Join the actual video room and let the existing users know someone joined.
  socket.on(VideoSocketEnum.roomJoin, async ({ roomId, user }, acknowledge) => {
    log.info(`room join user : ${JSON.stringify(user)}, roomId: ${roomId}`);

    const users = await getRoomParticipants(roomId, videoIo);

    // Keep the user's video information on the socket so it can be reused later.
    socket.data.videoUser = user;
    socket.data.videoRoomId = roomId;

    await socket.join(roomId);

    // Return the users already in the room to the newly joined user.
    acknowledge?.({ roomId, users });

    // Tell the other participants that this user has joined.
    socket.to(roomId).emit(VideoSocketEnum.userJoined, {
      id: socket.id,
      user,
    });

    await broadcastRoomState(roomId, videoIo);
  });

  // Watch the room without actually joining the video call.
  // Lobby users only need the current participant list.
  socket.on(VideoSocketEnum.roomWatch, async ({ roomId }) => {
    await socket.join(lobbyRoomId(roomId));

    const users = await getRoomParticipants(roomId, videoIo);

    socket.emit(VideoSocketEnum.roomState, { roomId, users });
  });

  // Stop receiving room updates when the user leaves the lobby view.
  socket.on(VideoSocketEnum.roomUnwatch, ({ roomId }) => {
    socket.leave(lobbyRoomId(roomId));
  });

  // Forward the WebRTC offer to the user who is being called.
  socket.on(VideoSocketEnum.userCall, ({ to, offer, user }) => {
    log.info(`user call to : ${to}, offer: ${offer}`);

    videoIo.to(to).emit(VideoSocketEnum.incomingCall, {
      from: socket.id,
      offer,
      user,
    });
  });

  // Send the WebRTC answer back to the user who started the call.
  socket.on(VideoSocketEnum.callAccepted, ({ to, ans }) => {
    log.info(`call accepted to : ${to}, ans: ${ans}`);

    videoIo.to(to).emit(VideoSocketEnum.callAccepted, {
      from: socket.id,
      ans,
    });
  });

  // Forward a new WebRTC offer when the peer connection needs renegotiation.
  socket.on(VideoSocketEnum.peerNegotiation, ({ to, offer }) => {
    log.info(`peer negotiation to : ${to}, offer: ${offer}`);

    videoIo.to(to).emit(VideoSocketEnum.peerNegotiation, {
      from: socket.id,
      offer,
    });
  });

  // Send the final negotiation answer back to the other peer.
  socket.on(VideoSocketEnum.peerNegotiationDone, ({ to, ans }) => {
    log.info(`peer negotiation done to : ${to}, ans: ${ans}`);

    videoIo.to(to).emit(VideoSocketEnum.peerNegotiationFinal, {
      from: socket.id,
      ans,
    });
  });

  // Leave the video room and notify the remaining participants.
  socket.on(VideoSocketEnum.roomLeave, async ({ roomId }) => {
    log.info(`room leave roomId: ${roomId}`);

    socket.leave(roomId);

    socket.to(roomId).emit(VideoSocketEnum.userLeft, {
      id: socket.id,
    });

    // Clear the stored room data only if this is the room currently associated with the socket.
    if (socket.data.videoRoomId === roomId) {
      delete socket.data.videoRoomId;
      delete socket.data.videoUser;
    }

    await broadcastRoomState(roomId, videoIo);
  });

  // Handle users who close the connection without explicitly leaving the room.
  socket.on(VideoSocketEnum.disconnect, async () => {
    log.info(`Video socket disconnected: ${socket.id}`);

    const roomId = socket.data.videoRoomId as string | undefined;

    if (roomId) {
      videoIo.to(roomId).emit(VideoSocketEnum.userLeft, {
        id: socket.id,
      });

      await broadcastRoomState(roomId, videoIo);
    }
  });
};
