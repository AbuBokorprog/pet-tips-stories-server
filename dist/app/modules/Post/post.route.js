"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = require("../../utils/validationRequest");
const post_validation_1 = require("./post.validation");
const post_controller_1 = require("./post.controller");
const auth_1 = require("../../middleware/auth");
const user_utils_1 = require("../User/user.utils");
const imageUploader_1 = require("../../utils/imageUploader");
const route = express_1.default.Router();
route.post('/create-post', imageUploader_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), (0, validationRequest_1.validationRequest)(post_validation_1.createPostValidationSchema), post_controller_1.postController.createPost);
route.get('/', post_controller_1.postController.retrieveAllPosts);
route.get('/:id', post_controller_1.postController.specificPost);
route.get('/author/:authorId', (0, auth_1.Auth)(user_utils_1.userRoles.USER), post_controller_1.postController.retrieveAllPostByAuthor);
route.patch('/:id/upvote', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), post_controller_1.postController.toggleUpVotes);
route.patch('/:id/downvote', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), post_controller_1.postController.toggleDownVotes);
route.put('/:id', imageUploader_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), (0, validationRequest_1.validationRequest)(post_validation_1.updatePostValidationSchema), post_controller_1.postController.updatePost);
route.delete('/:id', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), post_controller_1.postController.deletePost);
exports.postRouter = route;
