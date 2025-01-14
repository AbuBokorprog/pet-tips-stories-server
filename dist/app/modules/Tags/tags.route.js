"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsRoute = void 0;
const express_1 = __importDefault(require("express"));
const tags_controller_1 = require("./tags.controller");
const route = express_1.default.Router();
route.post('/', tags_controller_1.tagsController.createTag);
route.get('/', tags_controller_1.tagsController.createTag);
route.patch('/:id', tags_controller_1.tagsController.createTag);
route.delete('/:id', tags_controller_1.tagsController.createTag);
exports.tagsRoute = route;
