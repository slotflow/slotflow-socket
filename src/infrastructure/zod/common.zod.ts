import z from "zod";
import { Types } from "mongoose";

export const objectIdField = (fieldName = "ID") =>
    z.string({
        required_error: `${fieldName} is required`,
        invalid_type_error: `${fieldName} must be a string`,
    }).refine(id => Types.ObjectId.isValid(id), {
        message: `Invalid ${fieldName} format`,
    });