"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentModel = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    authorId: {
        types: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    postId: {
        types: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.commentModel = (0, mongoose_1.model)('comment', commentSchema);
