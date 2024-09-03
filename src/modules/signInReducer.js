import { useContext } from "react";
import { UserInfoDispatchContext, UserInfoStateContext } from "../Context/UserInfoContextProvider";

export const signInitialState = null;

export const signInReducer = (state = signInitialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return action.payload;

    case "SIGN_OUT":
      return null;

    default:
      return state;
  }
};

export const useUserInfoState = () => {
  return useContext(UserInfoStateContext);
};

export const useUserInfoDispatch = () => {
  return useContext(UserInfoDispatchContext);
};
