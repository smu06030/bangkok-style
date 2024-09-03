import { createContext, useReducer } from "react";
import { postsInitialState, postsReducer } from "../modules/postsReducer";

export const PostStateContext = createContext();
export const PostDispatchContext = createContext();

const PostsContextProvider = ({ children }) => {
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

  const allPosts = postsState.allPosts;
  const displayedPosts = postsState.displayedPosts;
  const filteredPosts = postsState.filteredPosts;
  const debounceValue = postsState.debounceValue;

  return (
    <PostDispatchContext.Provider value={{ setAllPosts, setDisplayedPosts, setFilteredPosts, setDebounceValue }}>
      <PostStateContext.Provider value={{ allPosts, displayedPosts, filteredPosts, debounceValue }}>
        {children}
      </PostStateContext.Provider>
    </PostDispatchContext.Provider>
  );
};

export default PostsContextProvider;
