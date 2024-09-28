import { IPost } from './post.interface';
import { postModel } from './post.model';

const createPost = async (payload: IPost) => {
  const res = await postModel.create(payload);

  if()

  return res;
};

export const postServices = {
  createPost,
  updatePost,
  deletePost,
  specificPost,
};
