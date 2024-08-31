import { useReducer } from "react";
import EntireContext from "./EntireContext";
import { signInitialState, signInReducer } from "../modules/signInReducer";
import { postsInitialState, postsReducer } from "../modules/postsReducer";

const ContextProvider = ({ children }) => {
  // 로그인 state
  const [userInfo, userInfoDispatch] = useReducer(signInReducer, signInitialState);
  // 게시물 state
  const [postsState, postsDispatch] = useReducer(postsReducer, postsInitialState);
  // 게시물 setter함수
  const setPosts = (posts) => {
    postsDispatch({ type: "SET_DATA", posts });
  };

  // context provider의 value에 할당할 객체
  const contextValues = {
    userInfo,
    posts: postsState,
    setPosts,
    signIn: (userInfo) => userInfoDispatch({ type: "SIGN_IN", payload: userInfo }),
    signOut: () => userInfoDispatch({ type: "SIGN_OUT" })
  };

  return <EntireContext.Provider value={contextValues}>{children}</EntireContext.Provider>;
};

export default ContextProvider;
