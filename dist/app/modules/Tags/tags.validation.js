"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagValidation = void 0;
const zod_1 = require("zod");
const createTagValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Please type category name!'),
    description: zod_1.z.string().optional(),
});
const updateTagValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
exports.TagValidation = {
    createTagValidationSchema,
    updateTagValidationSchema,
};
