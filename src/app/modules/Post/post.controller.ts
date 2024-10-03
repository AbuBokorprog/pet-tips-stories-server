import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import { postServices } from './post.service';

const createPost = catchAsync(async (req, res) => {
  const user = req.user;
  const data = await postServices.createPost(user && user._id, req.body);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Post created successfully!',
    data,
  });
});

const retrieveAllPosts = catchAsync(async (req, res) => {
  const data = await postServices.retrieveAllPosts(req.query);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved all post successfully!',
    data,
  });
});

const retrieveAllPostByAuthor = catchAsync(async (req, res) => {
  const { authorId } = req.params;
  const data = await postServices.retrieveAllPostByAuthor(authorId);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'retrieved post by author successfully!',
    data,
  });
});

const specificPost = catchAsync(async (req, res) => {
  const { id } = req.params;

  const data = await postServices.specificPost(id);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Specific post retrieved successfully!',
    data,
  });
});

const toggleUpVotes = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const data = await postServices.toggleUpVotes(id, user && user._id);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Upvote successfully!',
    data,
  });
});

const toggleDownVotes = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const data = await postServices.toggleDownVotes(id, user && user._id);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Downvote successfully!',
    data,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;

  const data = await postServices.updatePost(id, req.body);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post updated successfully!',
    data,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;

  const data = await postServices.deletePost(id);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post deleted successfully!',
    data,
  });
});

export const postController = {
  createPost,
  retrieveAllPosts,
  updatePost,
  deletePost,
  specificPost,
  toggleUpVotes,
  toggleDownVotes,
  retrieveAllPostByAuthor,
};
