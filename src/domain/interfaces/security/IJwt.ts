import { JwtClaims } from "../../commands/jwt.commads";

export interface IJWT {

  generateToken(payload: JwtClaims,expiresIn?: string): Promise<string>;

  verifyToken(token: string): Promise<JwtClaims>;

};
