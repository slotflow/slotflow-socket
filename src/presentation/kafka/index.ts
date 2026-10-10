import { kafkaProducer } from "../../infrastructure/messaging";
import { processedEventRepository } from "../../infrastructure/repository";
import { ProcessEventWrapperUseCase } from "../../application/usecase/kafka/processEventWrapper.useCase";
import { ProviderSubscriptionUpdatedUseCase } from "../../application/usecase/kafka/subscriptionUpdated.useCase";
import { HandlerMap } from "../../application/dtos/kafka.dtos";

export const processEventWrapperUseCase = new ProcessEventWrapperUseCase(
  processedEventRepository,
  kafkaProducer,
);

export const handler: HandlerMap = {
  planSubscribed: new ProviderSubscriptionUpdatedUseCase(),
};
