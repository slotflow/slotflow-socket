import { JwtPayload } from "jsonwebtoken";
import { AuthUser } from "../../../application/dtos/common.dtos";

export interface AccessTokenPayload extends JwtPayload, Omit<AuthUser, "id"> {
  userId: string;
}
