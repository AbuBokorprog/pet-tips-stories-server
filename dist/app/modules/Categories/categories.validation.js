"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryValidation = void 0;
const zod_1 = require("zod");
const createCategoryValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Please type category name!'),
});
const updateCategoryValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
});
exports.createCategoryValidation = {
    createCategoryValidationSchema,
    updateCategoryValidationSchema,
};
