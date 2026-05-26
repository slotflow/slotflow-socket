import { JWTImpl } from "./jwt.impl";
import { IJWT } from "../../domain/interfaces/security/IJwt";

export const jwtService: IJWT = new JWTImpl();
