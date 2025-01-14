"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const successRespon_1 = __importDefault(require("../../utils/successRespon"));
const categories_server_1 = require("./categories.server");
const createCategory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await categories_server_1.categoryService.createCategory(req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Category created successfully!',
        data,
    });
});
const retrieveAllCategory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = await categories_server_1.categoryService.retrieveAllCategory();
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Retrieve categories successfully!',
        data,
    });
});
const updateCategory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await categories_server_1.categoryService.updateCategory(id, req.body);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Update category successfully!',
        data,
    });
});
const deleteCategory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const data = await categories_server_1.categoryService.deleteCategory(id);
    (0, successRespon_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Delete category successfully!',
        data,
    });
});
exports.categoryController = {
    createCategory,
    retrieveAllCategory,
    updateCategory,
    deleteCategory,
};
