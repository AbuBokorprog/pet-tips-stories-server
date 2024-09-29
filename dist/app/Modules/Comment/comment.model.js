"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentModel = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    authorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'post',
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.commentModel = (0, mongoose_1.model)('comment', commentSchema);