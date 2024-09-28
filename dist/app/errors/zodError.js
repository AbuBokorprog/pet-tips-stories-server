"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodErrorHandler = void 0;
const ZodErrorHandler = (err) => {
    const errorSource = err.issues.map((issue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue?.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Zod Validation Error',
        errorSource,
    };
};
exports.ZodErrorHandler = ZodErrorHandler;
