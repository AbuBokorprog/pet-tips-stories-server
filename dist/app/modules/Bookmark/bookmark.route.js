"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkRoute = void 0;
const express_1 = __importDefault(require("express"));
const bookmark_controller_1 = require("./bookmark.controller");
const route = express_1.default.Router();
route.post('/', bookmark_controller_1.bookmarkController.createBookmark);
route.get('/', bookmark_controller_1.bookmarkController.retrieveUserAllBookmark);
route.patch('/:id', bookmark_controller_1.bookmarkController.updateBookmark);
route.delete('/:id', bookmark_controller_1.bookmarkController.deleteBookmark);
exports.bookmarkRoute = route;
