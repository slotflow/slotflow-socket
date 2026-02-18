export interface ProviderSubscriptionUpdatedPayload {
    providerId: string;
    subscriptionPlan: string;
    startDate: Date;
    endDate: Date;
}