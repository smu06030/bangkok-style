import { usePostsDispatch, usePostsState } from "../modules/postsReducer";
import { useUserInfoDispatch, useUserInfoState } from "../modules/signInReducer";

const stateMap = {
  userInfo: useUserInfoState,
  posts: usePostsState
};

const dispatchMap = {
  userInfo: useUserInfoDispatch,
  posts: usePostsDispatch
};

export const useCustomSelector = (callback) => {
  return callback(stateMap)();
};

export const useCustomDispatch = (callback) => {
  return callback(dispatchMap)();
};
