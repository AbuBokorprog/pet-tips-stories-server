"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = exports.createComment = void 0;
const zod_1 = require("zod");
exports.createComment = zod_1.z.object({
    postId: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updateComment = zod_1.z.object({
    content: zod_1.z.string(),
});
