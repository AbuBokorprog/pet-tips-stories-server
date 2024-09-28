"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundError = void 0;
const notFoundError = (req, res, next) => {
    return res.status(400).json({
        success: false,
        message: 'API not found',
        error: '',
    });
};
exports.notFoundError = notFoundError;
