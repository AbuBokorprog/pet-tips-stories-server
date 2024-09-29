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
        ref: 'User',
    },
    comments: {
        type: [mongoose_1.Schema.Types.ObjectId],
        required: true,
        ref: 'User',
    },
    downVotes: {
        type: [mongoose_1.Schema.Types.ObjectId],
        required: true,
        ref: 'User',
    },
    upVotes: {
        type: [mongoose_1.Schema.Types.ObjectId],
        required: true,
        ref: 'User',
    },
    image: {
        type: [String],
        required: true,
    },
    premium: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: null,
    },
    tran_id: {
        type: String,
        default: null,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Success'],
        default: 'Pending',
    },
    isPaymentSuccessful: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.postModel = (0, mongoose_1.model)('post', postSchema);
