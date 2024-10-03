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
    const user = req.user;
    const data = await post_service_1.postServices.createPost(user && user._id, req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Post created successfully!',
        data,
    });
});
const retrieveAllPosts = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await post_service_1.postServices.retrieveAllPosts(req.query);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Retrieved all post successfully!',
        data,
    });
});
const retrieveAllPostByAuthor = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { authorId } = req.params;
    const data = await post_service_1.postServices.retrieveAllPostByAuthor(authorId);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'retrieved post by author successfully!',
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
const toggleUpVotes = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const data = await post_service_1.postServices.toggleUpVotes(id, user && user._id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Upvote successfully!',
        data,
    });
});
const toggleDownVotes = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const data = await post_service_1.postServices.toggleDownVotes(id, user && user._id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Downvote successfully!',
        data,
    });
});
const updatePost = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await post_service_1.postServices.updatePost(id, req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
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
    toggleUpVotes,
    toggleDownVotes,
    retrieveAllPostByAuthor,
};
