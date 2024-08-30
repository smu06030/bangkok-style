export const postsInitialState = {
  posts: [],
};

export const postsReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        posts: [...action.posts]
      }

    default:
      return state;
  }
};