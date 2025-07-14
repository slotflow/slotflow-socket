import jwt from 'jsonwebtoken';
import { DecodedUser } from '../../express';
import { jwtConfig } from "../../config/env";
import { NextFunction, Request, Response } from "express";

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const jwtSecret = jwtConfig.jwtSecret;
    const token = req.headers.authorization?.split(" ")[1];
    const currentTime = Date.now();

    if (!token) {
        res.status(401).json({ success: false, message: "Unauthorized, no token." });
        return;
    }

    try {
        const decoded = jwt.verify(token, jwtSecret as jwt.Secret);
        if (decoded && typeof decoded !== "string" && decoded.exp && currentTime > decoded.exp * 1000) {
            res.status(401).json({ success: false, message: "Unauthorized: Token expired." });
            return;
        }

        req.user = decoded as DecodedUser;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized: Invalid token." });
    }
}