import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../domain/enums/common.enums";

// provider subscription success update event payload
export interface ProviderSubscriptionUpdatedPayload {
    userId: string;
    subscriptionPlan: string;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    subscriptionStatus: string;
    hasUsedTrial: boolean;
}

// stripe account status update event payload
export interface StripeAccountStatusUpdatedPayload {
    userId: string;
    stripeAccountStatus: string;
}

// provider service availability slot engagement event payload
export interface SlotEngageRequest {
  providerId: string;
  date: string;
  slotId: string;
}

// provider join to the slot enagagement data event payload
export interface ProviderJoin {
  providerId: string;
}

// Video call user payload
export type VideoRoomUser = {
  id?: string;
  name?: string;
  profileImage?: string;
};