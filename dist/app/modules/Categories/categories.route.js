"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const categories_controller_1 = require("./categories.controller");
const imageUploader_1 = require("../../utils/imageUploader");
const route = express_1.default.Router();
route.post('/', imageUploader_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body);
    next();
}, categories_controller_1.categoryController.createCategory);
route.get('/', categories_controller_1.categoryController.retrieveAllCategory);
route.patch('/:id', imageUploader_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body);
    next();
}, categories_controller_1.categoryController.updateCategory);
route.delete('/:id', categories_controller_1.categoryController.deleteCategory);
exports.categoryRoute = route;
