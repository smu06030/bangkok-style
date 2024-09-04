import { useContext } from "react";
import { PostDispatchContext, PostStateContext } from "../Context/PostsContextProvider";

export const postsInitialState = {
  allPosts: [],
  displayedPosts: [],
  filteredPosts: [],
  debounceValue: ""
};

export const postsReducer = (state, action) => {
  switch (action.type) {
    case "ALL_POSTS":
      return {
        ...state,
        allPosts: [...action.allPosts]
      };
    case "DISPLAYED_POSTS":
      return {
        ...state,
        displayedPosts: [...action.displayedPosts]
      };
    case "FILTERED_POSTS":
      return {
        ...state,
        filteredPosts: [...action.filteredPosts]
      };
    case "DEBOUNCE_VALUE":
      return {
        ...state,
        debounceValue: action.debounceValue
      };
    default:
      return state;
  }
};

export const usePostsState = () => {
  return useContext(PostStateContext);
};

export const usePostsDispatch = () => {
  return useContext(PostDispatchContext);
};
