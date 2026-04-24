import z from "zod";
import { messageRegex, objectIdRegex } from "../utils/regex";

export const getAllMessageSchema = z.object({
    toUserId: z.string().regex(objectIdRegex, "Invalid toUserId"),
});

export const sendMessageSchema = z.object({
    receiverId: z.string().regex(objectIdRegex, "Invalid receiverId"),
    file: z.custom<Express.Multer.File>().optional(),
    text: z.string().regex(messageRegex, "Invalid message"),
})