"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const zod_1 = require("zod");
const zodError_1 = require("../errors/zodError");
const config_1 = __importDefault(require("../config"));
const mongooseError_1 = require("../errors/mongooseError");
const castError_1 = require("../errors/castError");
const duplicateError_1 = require("../errors/duplicateError");
const globalErrorHandler = (err, req, res, next) => {
    let status = 500;
    let message = err.message || 'Something went wrong!';
    let errorSource = [];
    // zod error
    if (err instanceof zod_1.ZodError) {
        const error = (0, zodError_1.ZodErrorHandler)(err);
        status = error.statusCode;
        message = error.message;
        errorSource = error.errorSource;
        // mongoose error
    }
    else if (err.name === 'validationError') {
        const simplifiedError = (0, mongooseError_1.mongooseValidationError)(err);
        status = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
        // cast error
    }
    else if (err.name === 'CastError') {
        const simplifiedError = (0, castError_1.CastErrorHandle)(err);
        status = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
        // duplicate error
    }
    else if (err.code === 11000) {
        const simplifiedError = (0, duplicateError_1.duplicateErrorHandle)(err);
        status = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
        // app error
    }
    else if (err instanceof AppError_1.default) {
        status = err.statusCode;
        message = err?.message;
        errorSource = [
            {
                path: '',
                message: err?.message,
            },
        ];
        // error
    }
    else if (err instanceof Error) {
        message = err?.message;
        errorSource = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }
    //   return error
    return res.status(status).json({
        success: false,
        message: message,
        errorSource: errorSource,
        stack: config_1.default.node_env === 'development' ? err.stack : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
