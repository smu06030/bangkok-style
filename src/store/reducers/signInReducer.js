export const signInitialState = false;

export const signInReducer = (state = signInitialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return true;

    case "SIGN_OUT":
      return false;

    default:
      return state;
  }
};
