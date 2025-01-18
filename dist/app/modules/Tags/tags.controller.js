"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const tags_service_1 = require("./tags.service");
const createTag = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await tags_service_1.tagsService.createTag(req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Tag created successfully!',
        data,
    });
});
const retrieveAllTag = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await tags_service_1.tagsService.retrieveAllTag();
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Retrieve tags successfully!',
        data,
    });
});
const retrieveSpecificTag = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await tags_service_1.tagsService.retrieveSpecificTag(id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Retrieve tag successfully!',
        data,
    });
});
const updateTag = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await tags_service_1.tagsService.updateTag(id, req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Update tag successfully!',
        data,
    });
});
const deleteTag = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await tags_service_1.tagsService.deleteTag(id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Delete tag successfully!',
        data,
    });
});
exports.tagsController = {
    createTag,
    retrieveAllTag,
    updateTag,
    deleteTag,
    retrieveSpecificTag,
};
