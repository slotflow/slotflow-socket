import http from "http";
import app from "../../app";
import { Server } from "socket.io";
import { redisClient } from "./redis";

const socketServer = http.createServer(app);

const chatIo = new Server(socketServer, { path: "/chat", cors: { origin: ["http://localhost:5173"], }, });

const videoIo = new Server(socketServer, { path: "/video", cors: { origin: "http://localhost:5173" } });

export async function getReceiverSocketId(userId: string): Promise<string | null> {
    return await redisClient.get(`socket:${userId}`);
}

async function getOnlineUsers(): Promise<string[]> {
    const keys = await redisClient.keys("socket:*");
    return keys.map((key: string) => key.split(":")[1]);
}



chatIo.on("connection", async (chatSocket) => {
    (async () => {
        console.log("socket io coneected");

        const queryUserId = chatSocket.handshake.query.userId;
        const userId = typeof queryUserId === "string" ? queryUserId : null;

        if (userId) {
            await redisClient.set(`socket:${userId}`, chatSocket.id);
        }

        chatIo.emit("getOnlineUsers", await getOnlineUsers());

        chatSocket.on("typing", async ({ fromUserId, toUserId }: { fromUserId: string; toUserId: string }) => {
            const toSocketId: string | null = await redisClient.get(`socket:${toUserId}`);
            if (toSocketId) chatIo.to(toSocketId).emit("typing", { fromUserId, toUserId });
        });

        chatSocket.on("stopTyping", async ({ fromUserId, toUserId }: { fromUserId: string; toUserId: string }) => {
            const toSocketId: string | null = await redisClient.get(`socket:${toUserId}`);
            if (toSocketId) chatIo.to(toSocketId).emit("stopTyping", { fromUserId, toUserId });
        });

        chatSocket.on("disconnect", async () => {
            if (userId) {
                await redisClient.del(`socket:${userId}`);
            }
            chatIo.emit("getOnlineUsers", await getOnlineUsers());
        });

    })();
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

// videoIo.on("connection", async (videoSocket) => {
  
//   videoSocket.on("room:join", (data) => {
//     const { uid, room , username} = data;
//     console.log(`${username} joined room ${room}`);
//     emailToSocketIdMap.set(uid, videoSocket.id);
//     socketidToEmailMap.set(videoSocket.id, uid);
//     videoIo.to(room).emit("user:joined", { id: videoSocket.id, username });
//     videoSocket.join(room);
//     videoIo.to(videoSocket.id).emit("room:join", data);
//   });

//   videoSocket.on("user:call", ({ to, offer }) => {
//     videoIo.to(to).emit("incomming:call", { from: videoSocket.id, offer });
//   });

//   videoSocket.on("call:accepted", ({ to, ans }) => {
//     videoIo.to(to).emit("call:accepted", { from: videoSocket.id, ans });
//   });

//   videoSocket.on("peer:nego:needed", ({ to, offer }) => {
//     console.log("peer:nego:needed", offer);
//     videoIo.to(to).emit("peer:nego:needed", { from: videoSocket.id, offer });
//   });

//   videoSocket.on("peer:nego:done", ({ to, ans }) => {
//     console.log("peer:nego:done", ans);
//     videoIo.to(to).emit("peer:nego:final", { from: videoSocket.id, ans });
//   });
// })

videoIo.on("connection", (videoSocket) => {
  console.log(`Socket connected: ${videoSocket.id}`);

  videoSocket.on("room:join", ({ roomId, user }) => {
    videoSocket.join(roomId);
    console.log(`${user.email} joined room ${roomId}`);

    // Notify others that someone joined
    videoSocket.to(roomId).emit("user:joined", { id: videoSocket.id, user });
  });

  videoSocket.on("user:call", ({ to, offer }) => {
    videoIo.to(to).emit("incomming:call", { from: videoSocket.id, offer });
  });

  videoSocket.on("call:accepted", ({ to, ans }) => {
    videoIo.to(to).emit("call:accepted", { from: videoSocket.id, ans });
  });

  videoSocket.on("peer:nego:needed", ({ to, offer }) => {
    videoIo.to(to).emit("peer:nego:needed", { from: videoSocket.id, offer });
  });

  videoSocket.on("peer:nego:done", ({ to, ans }) => {
    videoIo.to(to).emit("peer:nego:final", { from: videoSocket.id, ans });
  });

  videoSocket.on("room:leave", ({ roomId }) => {
    videoSocket.leave(roomId);
    videoSocket.to(roomId).emit("user:left", { id: videoSocket.id });
  });

  videoSocket.on("disconnect", () => {
    console.log(`Socket disconnected: ${videoSocket.id}`);
  });
});


export { chatIo, socketServer, videoIo };
