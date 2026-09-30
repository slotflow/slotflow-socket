import { Role } from "../../domain/enums/common.enums";

export interface MessageDTO {
    _id: string;
    senderId: string;
    receiverId: string;
    text: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthUser {
    id: string;
    role: Role;
    email: string;
    name: string;
};

export interface SendMessageInput {
    senderId: string;
    receiverId: string;
    text: string;
    file?: Express.Multer.File;
}

export interface GetAllMessageInput {
    fromUserId: string;
    toUserId: string;
}

export type GetAllMessagesOutput = Array<MessageDTO>;