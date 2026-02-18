import { ProviderSubscriptionUpdatedUseCase } from "../../application/provider/subscriptionUpdated.useCase";

export const handler = {
    providerSubscriptionUpdated: new ProviderSubscriptionUpdatedUseCase(),
};