import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../../domain/enums/common.enums";

export interface ProviderSubscriptionUpdatedPayload {
    providerId: string;
    subscriptionPlan: string;
    startDate: Date;
    endDate: Date;
}

export interface AccessTokenPayload extends JwtPayload {
  userOrProviderId: string;
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