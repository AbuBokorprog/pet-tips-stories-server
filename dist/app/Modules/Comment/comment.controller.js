"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const comment_services_1 = require("./comment.services");
const createComment = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await comment_services_1.commentServices.createComment(req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Comment created successfully!',
        data,
    });
});
const retrieveComment = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await comment_services_1.commentServices.retrieveComment();
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Comments retrieved successfully!',
        data,
    });
});
const updateComment = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await comment_services_1.commentServices.updateComment(id, req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Comment updated successfully!',
        data,
    });
});
const deleteComment = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await comment_services_1.commentServices.deleteComment(id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Comment deleted successfully!',
        data,
    });
});
exports.commentController = {
    createComment,
    retrieveComment,
    updateComment,
    deleteComment,
};
