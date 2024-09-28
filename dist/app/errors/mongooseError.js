"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseValidationError = void 0;
const mongooseValidationError = (err) => {
    const errorSource = Object.values(err?.errors).map((value) => {
        return {
            path: value.path,
            message: value.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode: statusCode,
        message: 'Mongoose validation error',
        errorSource: errorSource,
    };
};
exports.mongooseValidationError = mongooseValidationError;
