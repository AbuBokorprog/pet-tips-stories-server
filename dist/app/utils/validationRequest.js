"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationRequest = void 0;
const validationRequest = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.validationRequest = validationRequest;
