import { MessageProps } from "../../domain/contracts/message.contract";
import { Role } from "../../domain/enums/common.enums";

/**
 * Common dtos
 */

// Auth user
export interface AuthUser {
  id: string;
  role: Role;
  email: string;
  name: string;
  timeZone: TimeZone;
}

// Time zone interface
export interface TimeZone {
  value: string;
  label: string;
  offset: number;
  abbrev: string;
  altName: string;
}

/**
 * Message usecase dtos
 */

// sending message
export interface SendMessageInput {
  senderId: string;
  receiverId: string;
  text: string;
  file?: Express.Multer.File;
}
export type SendMessageOutput = MessageProps;

// Get all messages
export interface GetAllMessageInput {
  fromUserId: string;
  toUserId: string;
}
export type GetAllMessagesOutput = Array<MessageProps>;
