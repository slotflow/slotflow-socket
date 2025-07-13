import z from "zod";
import { objectIdField } from "./common.zod";

export const getAllMessagesParams = z.object({
    toUserId: objectIdField("to user id")
})