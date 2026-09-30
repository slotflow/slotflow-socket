import { JWTImpl } from "./jwt.service.impl";
import { IJWT } from "../../application/interfaces/security/IJwt.service";

export const jwtService: IJWT = new JWTImpl();
