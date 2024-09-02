export const postsInitialState = {
  allPosts: [],
  displayedPosts: [],
  filteredPosts: [],
  debounceValue: ""
};

export const postsReducer = (state, action) => {
  // console.log('들어왔니', action.filteredPosts)
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
