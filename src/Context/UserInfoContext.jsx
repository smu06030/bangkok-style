import { useReducer } from "react";
import { signInitialState, signInReducer } from "../modules/signInReducer";

const UserInfoContext = () => {
  // 로그인 state
  const [userInfo, userInfoDispatch] = useReducer(signInReducer, signInitialState);

  return {
    userInfo,
    signIn: (userInfo) => userInfoDispatch({ type: "SIGN_IN", payload: userInfo }),
    signOut: () => userInfoDispatch({ type: "SIGN_OUT" })
  };
};

export default UserInfoContext;
