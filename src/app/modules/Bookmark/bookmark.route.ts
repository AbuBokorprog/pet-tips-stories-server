import express from 'express';
import { bookmarkController } from './bookmark.controller';
const route = express.Router();

route.post('/', bookmarkController.createBookmark);
route.get('/', bookmarkController.retrieveUserAllBookmark);
route.patch('/:id', bookmarkController.updateBookmark);
route.delete('/:id', bookmarkController.deleteBookmark);

export const bookmarkRoute = route;
