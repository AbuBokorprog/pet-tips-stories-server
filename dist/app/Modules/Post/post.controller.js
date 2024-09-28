"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const post_service_1 = require("./post.service");
const createPost = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await post_service_1.postServices.createPost(req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Post created successfully!',
        data,
    });
});
const retrieveAllPosts = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await post_service_1.postServices.retrieveAllPosts();
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Specific post retrieved successfully!',
        data,
    });
});
const specificPost = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await post_service_1.postServices.specificPost(id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Specific post retrieved successfully!',
        data,
    });
});
const updatePost = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await post_service_1.postServices.updatePost(id, req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.UPGRADE_REQUIRED,
        message: 'Post updated successfully!',
        data,
    });
});
const deletePost = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await post_service_1.postServices.deletePost(id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Post deleted successfully!',
        data,
    });
});
exports.postController = {
    createPost,
    retrieveAllPosts,
    updatePost,
    deletePost,
    specificPost,
};
