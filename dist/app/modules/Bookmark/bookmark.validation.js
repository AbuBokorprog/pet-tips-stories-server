"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkValidation = void 0;
const zod_1 = require("zod");
const createBookmarkValidationSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'Please type category name!'),
});
exports.BookmarkValidation = {
    createBookmarkValidationSchema,
};
