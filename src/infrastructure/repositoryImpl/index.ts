import { MessageRepositoryImpl } from "./message.repository.impl";
import { ProcessedEventRepositoryImpl } from "./processedEvent.repository.impl";
import { IMessageRepository } from "../../domain/interfaces/repositories/IMessage.repository";
import { IProcessedEventRepository } from "../../domain/interfaces/repositories/IProcessedEvent.repository";

// message repository instance
export const messageRepository: IMessageRepository = new MessageRepositoryImpl();

// processed event repository instance
export const processedEventRepository: IProcessedEventRepository = new ProcessedEventRepositoryImpl();