import { useReducer } from "react";
import { postsInitialState, postsReducer } from "../modules/postsReducer";

const PostsValues = () => {
  // 게시물 state
  const [postsState, postsDispatch] = useReducer(postsReducer, postsInitialState);

  // 게시물 setter함수
  const setAllPosts = (allPosts) => {
    postsDispatch({ type: "ALL_POSTS", allPosts });
  };

  const setDisplayedPosts = (displayedPosts) => {
    postsDispatch({ type: "DISPLAYED_POSTS", displayedPosts });
  };

  const setFilteredPosts = (filteredPosts) => {
    postsDispatch({ type: "FILTERED_POSTS", filteredPosts });
  };

  const setDebounceValue = (debounceValue) => {
    postsDispatch({ type: "DEBOUNCE_VALUE", debounceValue });
  };

  return {
    allPosts: postsState.allPosts,
    displayedPosts: postsState.displayedPosts,
    filteredPosts: postsState.filteredPosts,
    debounceValue: postsState.debounceValue,
    setAllPosts,
    setDisplayedPosts,
    setFilteredPosts,
    setDebounceValue,
  };
};

export default PostsValues;
