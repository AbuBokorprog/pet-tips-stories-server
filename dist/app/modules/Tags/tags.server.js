"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const tags_model_1 = require("./tags.model");
const createTag = async (payload) => {
    const data = await tags_model_1.categoryModel.create(payload);
    return data;
};
const retrieveAllTag = async () => {
    const data = await tags_model_1.categoryModel.find();
    return data;
};
const updateTag = async (id, payload) => {
    const isExistTag = await tags_model_1.categoryModel.findById(id);
    if (!isExistTag) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Tag not found!');
    }
    const data = await tags_model_1.categoryModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return data;
};
const deleteTag = async (id) => {
    const isExistTag = await tags_model_1.categoryModel.findById(id);
    if (!isExistTag) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Tag not found!');
    }
    const data = await tags_model_1.categoryModel.findByIdAndDelete(id);
    return data;
};
exports.tagsService = {
    createTag,
    retrieveAllTag,
    updateTag,
    deleteTag,
};
