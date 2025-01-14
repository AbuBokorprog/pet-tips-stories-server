"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/User/user.route");
const post_route_1 = require("../modules/Post/post.route");
const comment_route_1 = require("../modules/Comment/comment.route");
const payment_route_1 = require("../modules/Payment/payment.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const categories_route_1 = require("../modules/Categories/categories.route");
const tags_route_1 = require("../modules/Tags/tags.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        path: '/user',
        route: user_route_1.userRouter,
    },
    {
        path: '/category',
        route: categories_route_1.categoryRoute,
    },
    {
        path: '/tag',
        route: tags_route_1.tagsRoute,
    },
    {
        path: '/post',
        route: post_route_1.postRouter,
    },
    {
        path: '/comment',
        route: comment_route_1.commentRouter,
    },
    {
        path: '/payment',
        route: payment_route_1.paymentRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
