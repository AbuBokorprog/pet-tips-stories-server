import { IUser } from './user.interface';
import { userModel } from './user.model';

const createUser = async (payload: IUser) => {
  const user = await userModel.create(payload);
  return user;
};

const updateUser = async (id: string, payload: IUser) => {
  const user = await userModel.findByIdAndUpdate(id, payload, { new: true });
  return user;
};

const deleteUser = async (id: string) => {
  const user = await userModel.findByIdAndDelete(id);
  return user;
};

const followUser = async (userId: string, followerId: string) => {
  await userModel.findByIdAndUpdate(userId, {
    $addToSet: { following: followerId },
  });
  await userModel.findByIdAndUpdate(followerId, {
    $addToSet: { followers: userId },
  });
};

const unFollowUser = async (userId: string, followerId: string) => {
  await userModel.findByIdAndUpdate(userId, {
    $pull: { followers: followerId },
  });
  await userModel.findByIdAndUpdate(followerId, {
    $pull: { following: userId },
  });
};

export const userServices = {
  createUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
};
