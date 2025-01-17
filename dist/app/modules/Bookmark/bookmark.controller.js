"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const bookmark_service_1 = require("./bookmark.service");
const createBookmark = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await bookmark_service_1.bookmarkService.createBookmark(req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Bookmark created successfully!',
        data,
    });
});
const retrieveUserAllBookmark = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { _id } = req.user;
    const data = await bookmark_service_1.bookmarkService.retrieveUserAllBookmark(_id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Retrieve categories successfully!',
        data,
    });
});
const updateBookmark = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await bookmark_service_1.bookmarkService.updateBookmark(id, req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Update tag successfully!',
        data,
    });
});
const deleteBookmark = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await bookmark_service_1.bookmarkService.deleteBookmark(id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Delete tag successfully!',
        data,
    });
});
exports.bookmarkController = {
    createBookmark,
    retrieveUserAllBookmark,
    updateBookmark,
    deleteBookmark,
};
