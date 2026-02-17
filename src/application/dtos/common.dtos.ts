import { Role } from "../../domain/enums/common.enums";

export interface DecodedUser {
  userOrProviderId?: string;
  role?: Role;
  googleAccessToken?: string;
  googleRefreshToken?: string;
  googleId?: string;
  email?: string;
  name?: string;
  image: string | null;
  connectOnly?: boolean;
  exp?: number;
  iat?: number;
  userId?: string;
};