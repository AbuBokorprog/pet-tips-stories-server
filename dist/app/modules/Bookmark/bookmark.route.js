"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkRoute = void 0;
const express_1 = __importDefault(require("express"));
const bookmark_controller_1 = require("./bookmark.controller");
const auth_1 = require("../../middleware/auth");
const user_utils_1 = require("../User/user.utils");
const route = express_1.default.Router();
route.post('/', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), bookmark_controller_1.bookmarkController.createBookmark);
route.get('/', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), bookmark_controller_1.bookmarkController.retrieveUserAllBookmark);
route.patch('/:id', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), bookmark_controller_1.bookmarkController.updateBookmark);
route.delete('/:id', (0, auth_1.Auth)(user_utils_1.userRoles.ADMIN, user_utils_1.userRoles.USER), bookmark_controller_1.bookmarkController.deleteBookmark);
exports.bookmarkRoute = route;
