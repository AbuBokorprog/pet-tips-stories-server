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
const route = express_1.default.Router();
route.post('/create-post', (0, validationRequest_1.validationRequest)(post_validation_1.createPostValidationSchema), post_controller_1.postController.createPost);
route.get('/', post_controller_1.postController.retrieveAllPosts);
route.get('/:id', post_controller_1.postController.specificPost);
route.put('/:id', (0, validationRequest_1.validationRequest)(post_validation_1.updatePostValidationSchema), post_controller_1.postController.updatePost);
route.delete('/:id', post_controller_1.postController.deletePost);
exports.postRouter = route;
