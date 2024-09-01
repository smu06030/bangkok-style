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

  return { allPosts: postsState.allPosts, displayedPosts: postsState.displayedPosts, setAllPosts, setDisplayedPosts };
};

export default PostsValues;
