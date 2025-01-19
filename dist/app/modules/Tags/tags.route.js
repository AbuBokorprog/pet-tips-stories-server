"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsRoute = void 0;
const express_1 = __importDefault(require("express"));
const tags_controller_1 = require("./tags.controller");
const auth_1 = require("../../middleware/auth");
const user_utils_1 = require("../User/user.utils");
const validationRequest_1 = require("../../utils/validationRequest");
const tags_validation_1 = require("./tags.validation");
const route = express_1.default.Router();
route.post('/', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN), (0, validationRequest_1.validationRequest)(tags_validation_1.TagValidation.createTagValidationSchema), tags_controller_1.tagsController.createTag);
route.get('/', tags_controller_1.tagsController.retrieveAllTag);
route.get('/:id', tags_controller_1.tagsController.retrieveSpecificTag);
route.patch('/:id', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), tags_controller_1.tagsController.updateTag);
route.delete('/:id', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), tags_controller_1.tagsController.deleteTag);
route.patch('/:id/follow', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), tags_controller_1.tagsController.followTag);
route.patch('/:id/unfollow', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), tags_controller_1.tagsController.unFollowTag);
exports.tagsRoute = route;
