import { ProviderSubscriptionPaymentSuccessRequest } from "../dtos/provider.dtos";

export class ProviderSubscriptionPaymentSuccessUseCase {
    constructor(

    ) { };

    async execute(payload: ProviderSubscriptionPaymentSuccessRequest): Promise<void> {
        const { subscriptionPlanName, userId } = payload;
        try {

        } catch (error) {
            throw error;
        }
    }
}