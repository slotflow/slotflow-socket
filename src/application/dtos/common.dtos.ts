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

export interface DecodedUser {
  id: string;
  role: Role;
  googleAccessToken?: string;
  googleRefreshToken?: string;
  googleId?: string;
  email?: string;
  name?: string;
  image: string | null;
  connectOnly?: boolean;
  exp?: number;
  iat?: number;
  userId?: string;
};

export interface SendMessageRequest {
    senderId: string;
    receiverId: string;
    text: string;
    file?: Express.Multer.File;
}

export interface GetAllMessageRequest {
    fromUserId: string;
    toUserId: string;
}

export type GetAllMessagesResponse = Array<MessageDTO>;