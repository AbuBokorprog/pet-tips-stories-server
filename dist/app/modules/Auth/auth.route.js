"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
// route.post('/register');
// route.post('/login');
route.post('/forget-password');
route.post('/refresh-token');
route.post('/reset-password');
exports.authRoutes = route;
