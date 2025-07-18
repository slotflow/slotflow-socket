import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/env';

const JWT_SECRET = jwtConfig.jwtSecret as string;

export class JWTService {

    static verifyToken(token: string): jwt.JwtPayload {
        try {
            const decoded = jwt.verify(token, JWT_SECRET as jwt.Secret);
            if (typeof decoded === "string") throw new Error("Invalid token format.");
            return decoded;
        } catch (error) {
            throw new Error("Token Verification failed.")
        }
    }
}