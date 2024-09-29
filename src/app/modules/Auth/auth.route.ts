import express from 'express';
const route = express.Router();

// route.post('/register');
// route.post('/login');
route.post('/forget-password');
route.post('/refresh-token');
route.post('/reset-password');

export const authRoutes = route;
