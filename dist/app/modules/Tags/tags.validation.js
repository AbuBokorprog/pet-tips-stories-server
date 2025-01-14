"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTagValidation = void 0;
const zod_1 = require("zod");
const createTagValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Please type category name!'),
});
const updateTagValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
});
exports.createTagValidation = {
    createTagValidationSchema,
    updateTagValidationSchema,
};
