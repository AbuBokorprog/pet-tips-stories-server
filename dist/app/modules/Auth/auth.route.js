"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_validation_1 = require("../User/user.validation");
const auth_controller_1 = require("./auth.controller");
const validationRequest_1 = require("../../utils/validationRequest");
const auth_validation_1 = require("./auth.validation");
const route = express_1.default.Router();
route.post('/register', (0, validationRequest_1.validationRequest)(user_validation_1.createUserValidation), auth_controller_1.authControllers.createUser);
route.post('/login', (0, validationRequest_1.validationRequest)(auth_validation_1.loginValidationSchema), auth_controller_1.authControllers.userLogin);
route.post('/forget-password');
route.post('/refresh-token');
route.post('/reset-password');
exports.authRoutes = route;
