"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['tips', 'story'],
        required: true,
    },
    authorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    comments: {
        type: [mongoose_1.Schema.Types.ObjectId],
        required: true,
        ref: 'user',
    },
    downVotes: {
        type: [mongoose_1.Schema.Types.ObjectId],
        required: true,
        ref: 'user',
    },
    upVotes: {
        type: [mongoose_1.Schema.Types.ObjectId],
        required: true,
        ref: 'user',
    },
    image: {
        type: [String],
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.postModel = (0, mongoose_1.model)('post', postSchema);
