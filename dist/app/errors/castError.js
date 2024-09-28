"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastErrorHandle = void 0;
const CastErrorHandle = (err) => {
    const errorSource = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    const status = 400;
    return {
        statusCode: status,
        message: 'Mongoose cast Error',
        errorSource: errorSource,
    };
};
exports.CastErrorHandle = CastErrorHandle;
