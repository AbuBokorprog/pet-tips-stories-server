import express from 'express';
import { categoryController } from './categories.controller';
import { upload } from '../../utils/imageUploader';
const route = express.Router();

route.post(
  '/',
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body);
    next();
  },
  categoryController.createCategory,
);

route.get('/', categoryController.retrieveAllCategory);
route.patch(
  '/:id',
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body);
    next();
  },
  categoryController.updateCategory,
);
route.delete('/:id', categoryController.deleteCategory);

export const categoryRoute = route;
