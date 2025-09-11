import http from "http";
import app from "../../app";
import { redis } from "./redis";
import { Types } from "mongoose";
import { Server } from "socket.io";

const socketServer = http.createServer(app);

const io = new Server(socketServer, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});

export async function getReceiverSocketId(userId: Types.ObjectId): Promise<string | null> {
    return await redis.get(`socket:${userId}`);
}

async function getOnlineUsers(): Promise<string[]> {
    const keys = await redis.keys("socket:*");
    return keys.map((key) => key.split(":")[1]);
}

const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();

io.on("connection", async (socket) => {
    (async () => {
        const queryUserId = socket.handshake.query.userId;
        const userId = typeof queryUserId === "string" ? queryUserId : null;

        if (userId) {
            await redis.set(`socket:${userId}`, socket.id);
        }

        io.emit("getOnlineUsers", await getOnlineUsers());

        socket.on("typing", async ({ fromUserId, toUserId }: { fromUserId: string; toUserId: string }) => {
            const toSocketId: string | null = await redis.get(`socket:${toUserId}`);
            if (toSocketId) io.to(toSocketId).emit("typing", { fromUserId, toUserId });
        });

        socket.on("stopTyping", async ({ fromUserId, toUserId }: { fromUserId: string; toUserId: string }) => {
            const toSocketId: string | null = await redis.get(`socket:${toUserId}`);
            if (toSocketId) io.to(toSocketId).emit("stopTyping", { fromUserId, toUserId });
        });

        socket.on("disconnect", async () => {
            if (userId) {
                await redis.del(`socket:${userId}`);
            }
            io.emit("getOnlineUsers", await getOnlineUsers());
        });

        // 🔴 Video call signaling events
        socket.on("room:join", data => {
            console.log("data : ",data);
            const { email, roomId } = data;
            emailToSocketIdMap.set(email, socket.id);
            socketIdToEmailMap.set(socket.id, email);
            io.to(socket.id).emit("room:join", data);
        })

        socket.on("call-offer", async ({ toUserId, offer }) => {
            const toSocketId: string | null = await redis.get(`socket:${toUserId}`);
            if (toSocketId) io.to(toSocketId).emit("call-offer", { fromUserId: userId, offer });
        });

        socket.on("call-answer", async ({ toUserId, answer }) => {
            const toSocketId: string | null = await redis.get(`socket:${toUserId}`);
            if (toSocketId) io.to(toSocketId).emit("call-answer", { answer });
        });

        socket.on("ice-candidate", async ({ toUserId, candidate }) => {
            const toSocketId: string | null = await redis.get(`socket:${toUserId}`);
            if (toSocketId) io.to(toSocketId).emit("ice-candidate", { candidate });
        });

        socket.on("disconnectVideoCall", async () => {
            if (userId) await redis.del(`socket:${userId}`);
            io.emit("getOnlineUsers", await getOnlineUsers());
        });
    })();
});

export { io, socketServer };
