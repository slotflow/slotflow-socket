import { ProviderSubscriptionUpdatedUseCase } from "../../application/usecase/system/subscriptionUpdated.useCase";

export const handler = {
    planSubscribed: new ProviderSubscriptionUpdatedUseCase(),
};