"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkModel = void 0;
const mongoose_1 = require("mongoose");
const bookmarkSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'post',
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
});
exports.bookmarkModel = (0, mongoose_1.model)('bookmark', bookmarkSchema);
