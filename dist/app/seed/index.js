"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSeed = void 0;
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../Modules/User/user.model");
const adminUser = {
    username: 'Super Admin',
    email: config_1.default.admin_email,
    password: config_1.default.admin_password,
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NIXc73ZgxZfbifJP3Bsv35sekQyklo-9JA&s',
    role: 'admin',
};
const AdminSeed = async () => {
    const isExistAdmin = await user_model_1.userModel.findOne({
        email: 'superadmin@gmail.com',
    });
    if (!isExistAdmin) {
        await user_model_1.userModel.create(adminUser);
    }
};
exports.AdminSeed = AdminSeed;
