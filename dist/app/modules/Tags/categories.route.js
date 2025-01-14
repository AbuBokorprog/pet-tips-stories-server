"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const categories_controller_1 = require("./categories.controller");
const route = express_1.default.Router();
route.post('/', categories_controller_1.categoryController.createCategory);
route.get('/', categories_controller_1.categoryController.createCategory);
route.patch('/:id', categories_controller_1.categoryController.createCategory);
route.delete('/:id', categories_controller_1.categoryController.createCategory);
exports.categoryRoute = route;
