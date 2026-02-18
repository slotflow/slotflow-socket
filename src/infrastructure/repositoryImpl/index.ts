import { MessageRepositoryImpl } from "./message.repository.impl";
import { IMessageRepository } from "../../domain/interfaces/repositories/IMessage.repository";

export const messageRepository: IMessageRepository = new MessageRepositoryImpl();