"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostValidationSchema = exports.createPostValidationSchema = void 0;
const zod_1 = require("zod");
exports.createPostValidationSchema = zod_1.z.object({
    title: zod_1.z.string().nonempty('Title is required'),
    content: zod_1.z.string().nonempty('Content is required'),
    category: zod_1.z.enum(['tips', 'story'], {
        errorMap: () => ({ message: 'Category must be either "tips" or "story"' }),
    }),
    comments: zod_1.z.array(zod_1.z.string()).optional(),
    downVotes: zod_1.z.array(zod_1.z.string()).optional(),
    upVotes: zod_1.z.array(zod_1.z.string()).optional(),
    image: zod_1.z
        .array(zod_1.z.string().url('Each image must be a valid URL'))
        .nonempty('At least one image is required'),
    premium: zod_1.z.boolean().optional(),
    price: zod_1.z.number().nullable().optional(),
});
exports.updatePostValidationSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    category: zod_1.z.enum(['tips', 'story']).optional(),
    comments: zod_1.z.array(zod_1.z.string()).optional(),
    downVotes: zod_1.z.array(zod_1.z.string()).optional(),
    upVotes: zod_1.z.array(zod_1.z.string()).optional(),
    image: zod_1.z.array(zod_1.z.string().url('Each image must be a valid URL')).optional(),
    premium: zod_1.z.boolean().optional(),
    price: zod_1.z.number().nullable().optional(),
});
