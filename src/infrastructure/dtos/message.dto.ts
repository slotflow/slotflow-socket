import { Types } from "mongoose";
import { Message } from "../../domain/entities/message.entity";

export type GetAllMessage = Array<Pick<Message, "_id" | "createdAt" | "image" | "receiverId" | "senderId" | "text">>;

export interface CommonRequest {
    fromUserId: Types.ObjectId,
    toUserId: Types.ObjectId,
}