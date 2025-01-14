"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const categories_model_1 = require("./categories.model");
const createCategory = async (payload) => {
    const data = await categories_model_1.categoryModel.create(payload);
    return data;
};
const retrieveAllCategory = async () => {
    const data = await categories_model_1.categoryModel.find();
    return data;
};
const updateCategory = async (id, payload) => {
    const isExistCategory = await categories_model_1.categoryModel.findById(id);
    if (!isExistCategory) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found!');
    }
    const data = await categories_model_1.categoryModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return data;
};
const deleteCategory = async (id) => {
    const isExistCategory = await categories_model_1.categoryModel.findById(id);
    if (!isExistCategory) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found!');
    }
    const data = await categories_model_1.categoryModel.findByIdAndDelete(id);
    return data;
};
exports.categoryService = {
    createCategory,
    retrieveAllCategory,
    updateCategory,
    deleteCategory,
};
