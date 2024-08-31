export const postsInitialState = {
  allPosts: [],
  displayedPosts: [],
};

export const postsReducer = (state, action) => {
  switch (action.type) {
    case "ALL_POSTS":
      return {
        ...state,
        allPosts: [...action.allPosts]
      }
    case "DISPLAYED_POSTS":
      return {
        ...state,
        displayedPosts: [...action.displayedPosts]
      }
      
    default:
      return state;
  }
};