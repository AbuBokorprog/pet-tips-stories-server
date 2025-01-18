"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagModel = void 0;
const mongoose_1 = require("mongoose");
const tagSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.tagModel = (0, mongoose_1.model)('tags', tagSchema);
