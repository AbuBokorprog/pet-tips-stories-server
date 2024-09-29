import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import { commentServices } from './comment.services';

const createComment = catchAsync(async (req, res) => {
  const data = await commentServices.createComment(req.body);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Comment created successfully!',
    data,
  });
});

const retrieveComment = catchAsync(async (req, res) => {
  const data = await commentServices.retrieveComment();

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Comments retrieved successfully!',
    data,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await commentServices.updateComment(id, req.body);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Comment updated successfully!',
    data,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await commentServices.deleteComment(id);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Comment deleted successfully!',
    data,
  });
});

export const commentController = {
  createComment,
  retrieveComment,
  updateComment,
  deleteComment,
};
