import z from "zod";
import { Types } from "mongoose";

export const objectIdField = (fieldName = "ID") =>
    z.string({
        required_error: `${fieldName} is required`,
        invalid_type_error: `${fieldName} must be a string`,
    }).refine(id => Types.ObjectId.isValid(id), {
        message: `Invalid ${fieldName} format`,
    });

export const stringField = (
    fieldName = "Value",
    min?: number,
    max?: number,
    regex?: RegExp,
    regexMessage = "Invalid format"
) => {
    let schema = z.string({
        required_error: `${fieldName} is required`,
        invalid_type_error: `${fieldName} must be a string`,
    });

    if (min !== undefined) {
        schema = schema.min(min, `${fieldName} must be at least ${min} characters`);
    }

    if (max !== undefined) {
        schema = schema.max(max, `${fieldName} must be at most ${max} characters`);
    }

    if (regex !== undefined) {
        schema = schema.regex(regex, regexMessage);
    }

    return schema;
};