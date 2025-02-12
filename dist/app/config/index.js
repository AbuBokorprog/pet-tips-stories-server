"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: `${process.env.MONGODB_URL}`,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASS,
    salt: process.env.SALT,
    access_secret: process.env.JWT_ACCESS_SECRET,
    access_expires: process.env.JWT_ACCESS_EXPIRES_IN,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_expires: process.env.JWT_REFRESH_EXPIRES_IN,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_secret_key: process.env.CLOUDINARY_SECRET_KEY,
};
