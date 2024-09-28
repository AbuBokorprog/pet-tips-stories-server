"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.duplicateErrorHandle = void 0;
const duplicateErrorHandle = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractMessage = match && match[1];
    const errorSource = [
        {
            path: '',
            message: `${extractMessage} is already exist!`,
        },
    ];
    const status = 400;
    return {
        statusCode: status,
        message: 'Duplicate error!',
        errorSource,
    };
};
exports.duplicateErrorHandle = duplicateErrorHandle;
