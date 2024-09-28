"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidation = exports.createUserValidation = void 0;
const zod_1 = require("zod");
exports.createUserValidation = zod_1.z.object({
    username: zod_1.z.string({
        required_error: 'Name is required',
    }),
    email: zod_1.z.string({
        required_error: 'Email is required',
    }),
    password: zod_1.z.string({
        required_error: 'Password is required',
    }),
    role: zod_1.z.enum(['admin', 'user']).optional(),
});
exports.updateUserValidation = zod_1.z.object({
    username: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
    role: zod_1.z.enum(['admin', 'user']).optional(),
});
