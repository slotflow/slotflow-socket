import { PlanName } from "../../domain/enums/common.enums";

export interface ProviderSubscriptionPaymentSuccessRequest {
    subscriptionPlanName: PlanName;
    userId: string;
}