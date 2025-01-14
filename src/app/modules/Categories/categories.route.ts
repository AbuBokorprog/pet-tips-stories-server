import express from 'express';
import { categoryController } from './categories.controller';
const route = express.Router();

route.post('/', categoryController.createCategory);
route.get('/', categoryController.createCategory);
route.patch('/:id', categoryController.createCategory);
route.delete('/:id', categoryController.createCategory);

export const categoryRoute = route;
