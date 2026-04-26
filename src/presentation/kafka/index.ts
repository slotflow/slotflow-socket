import { kafkaProducer } from "../../infrastructure/messaging";
import { processedEventRepository } from "../../infrastructure/repositoryImpl";
import { ProcessEventWrapperUseCase } from "../../application/usecase/kafka/processEventWrapper.useCase";
import { ProviderSubscriptionUpdatedUseCase } from "../../application/usecase/kafka/subscriptionUpdated.useCase";

export const processEventWrapperUseCase = new ProcessEventWrapperUseCase(processedEventRepository, kafkaProducer);

export const handler = {
    planSubscribed: new ProviderSubscriptionUpdatedUseCase(),
};