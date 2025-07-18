import { Types } from "mongoose";
import { Message } from "../../domain/entities/message.entity";

export interface CommonRequest {
    fromUserId: Types.ObjectId,
    toUserId: Types.ObjectId,
}
export type GetAllMessageResponse = Array<Pick<Message, "_id" | "createdAt" | "image" | "receiverId" | "senderId" | "text">>;

type SendMessage = Pick<Message, "senderId" | "receiverId" | "text" >;
// 2. Request from client to controller/service layer — includes the file
export interface SendMessageRequest extends SendMessage {
  file: File;
}

// 3. Repository layer version — replaces `file` with the final `image` field
export interface SendMessageRequestForRepository
  extends Omit<SendMessageRequest, "file">,
    Pick<Message, "image"> {}
