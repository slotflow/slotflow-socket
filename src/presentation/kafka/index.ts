import { ProviderSubscriptionUpdatedUseCase } from "../../application/provider/subscriptionUpdated.useCase";

export const handler = {
    planSubscribed: new ProviderSubscriptionUpdatedUseCase(),
};