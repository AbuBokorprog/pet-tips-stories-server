import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import { commentServices } from './comment.services';
import { Types } from 'mongoose';

const createComment = catchAsync(async (req, res) => {
  const user = req.user;

  const data = await commentServices.createComment(user && user._id, req.body);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Comment created successfully!',
    data,
  });
});

const replyComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const parentCommentId = new Types.ObjectId(id);
  const data = await commentServices.replyComment(
    user && user._id,
    parentCommentId,
    req.body,
  );

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Comment created successfully!',
    data,
  });
});

const retrieveComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await commentServices.retrieveComments(id);

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
  replyComment,
};
