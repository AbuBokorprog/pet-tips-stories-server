import express from 'express';
import { tagsController } from './tags.controller';
const route = express.Router();

route.post('/', tagsController.createTag);
route.get('/', tagsController.createTag);
route.patch('/:id', tagsController.createTag);
route.delete('/:id', tagsController.createTag);

export const tagsRoute = route;
