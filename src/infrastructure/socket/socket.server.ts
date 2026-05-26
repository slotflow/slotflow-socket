import http from "http";
import app from "../../app/app";
import { Server } from "socket.io";
import { serviceConfig } from "../../config/env";

export const socketServer = http.createServer(app);

export const io = new Server(socketServer, {
    path: "/socket.io",
    cors: {
        origin: [serviceConfig.frontendUrl],
        credentials: true,
    },
});