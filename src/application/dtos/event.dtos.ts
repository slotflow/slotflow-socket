import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../domain/enums/common.enums";

export interface ProviderSubscriptionUpdatedPayload {
    userId: string;
    subscriptionPlan: string;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    subscriptionStatus: string;
    hasUsedTrial: boolean;
}

export interface StripeAccountStatusUpdatedPayload {
    userId: string;
    stripeAccountStatus: string;
}

export interface AccessTokenPayload extends JwtPayload {
  id: string;
  role: Role;
};

export interface SlotEngageRequest {
  providerId: string;
  date: string;
  slotId: string;
}

export interface ProviderJoin {
  providerId: string;
}

export type VideoRoomUser = {
  id?: string;
  name?: string;
  profileImage?: string;
};