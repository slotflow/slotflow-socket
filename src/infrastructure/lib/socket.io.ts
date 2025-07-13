import http from "http";
import express from "express";
import { redis } from "./redis";
import { Types } from "mongoose";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
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

io.on("connection", async (socket) => {
    const queryUserId = socket.handshake.query.userId;
    const userId = typeof queryUserId === "string" ? queryUserId : null;

    if (userId) {
        await redis.set(`socket:${userId}`, socket.id);
    }

    io.emit("getOnlineUsers", await getOnlineUsers());

    socket.on("typing", async ({ fromUserId, toUserId }: { fromUserId: string; toUserId: string }) => {
        const toSocketId: string | null = await redis.get(`socket:${toUserId}`);
        if (toSocketId) {
            io.to(toSocketId).emit("typing", { fromUserId, toUserId });
        }
    });

    socket.on("stopTyping", async ({ fromUserId, toUserId }: { fromUserId: string; toUserId: string }) => {
        const toSocketId: string | null = await redis.get(`socket:${toUserId}`);
        if (toSocketId) {
            io.to(toSocketId).emit("stopTyping", { fromUserId, toUserId });
        }
    });

    socket.on("disconnect", async () => {
        if (userId) {
            await redis.del(`socket:${userId}`);
        }
        io.emit("getOnlineUsers", await getOnlineUsers());
    });
});

export { io, app, server };
