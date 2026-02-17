import { ProviderSubscriptionPaymentSuccessUseCase } from "../../application/provider/subscriptionPaymentSuccess.useCase";

export const handler = {
    providerSubscriptionPaymentSuccess: new ProviderSubscriptionPaymentSuccessUseCase(),
};