"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
    },
    image: {
        type: String,
    },
}, { timestamps: true });
exports.categoryModel = (0, mongoose_1.model)('category', categorySchema);
