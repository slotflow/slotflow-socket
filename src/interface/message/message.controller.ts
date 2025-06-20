import { Request, Response } from "express";
import { HandleError } from "../../infrastructure/error/error";

export class MessageController {
    constructor(

    ) {

    }

    async getMessages(req:Request, res: Response) {
        try {
            
        } catch (error) {
            HandleError.handle(error, res);
        }
    }
}