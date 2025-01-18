import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import { bookmarkService } from './bookmark.service';

const createBookmark = catchAsync(async (req, res) => {
  const { _id }: any = req?.user;
  const data = await bookmarkService.createBookmark(_id, req.body);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Bookmark created successfully!',
    data,
  });
});

const retrieveUserAllBookmark = catchAsync(async (req, res) => {
  const { _id }: any = req.user;
  const data = await bookmarkService.retrieveUserAllBookmark(_id);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Retrieve categories successfully!',
    data,
  });
});
const updateBookmark = catchAsync(async (req, res) => {
  const { id }: any = req.params;
  const data = await bookmarkService.updateBookmark(id, req.body);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Update tag successfully!',
    data,
  });
});
const deleteBookmark = catchAsync(async (req, res) => {
  const { id }: any = req.params;
  const data = await bookmarkService.deleteBookmark(id);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Delete tag successfully!',
    data,
  });
});

export const bookmarkController = {
  createBookmark,
  retrieveUserAllBookmark,
  updateBookmark,
  deleteBookmark,
};
