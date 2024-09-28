"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./app/route"));
const globalError_1 = require("./app/middleware/globalError");
const notFoundError_1 = require("./app/middleware/notFoundError");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use(route_1.default);
app.get('/', (req, res) => {
    res.send('Project setup home page');
});
// global error
app.use(globalError_1.globalErrorHandler);
// notfound route handler
app.use(notFoundError_1.notFoundError);
exports.default = app;
