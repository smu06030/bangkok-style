import { useReducer } from "react";
import EntireContext from "./EntireContext";
import { signInitialState, signInReducer } from "../reducers/signInReducer";
import { postsInitialState, postsReducer } from "../reducers/postsReducer";

const EntireProvider = ({ children }) => {
  // 로그인 context
  const [signState, signDispatch] = useReducer(signInReducer, signInitialState);
  // 게시물 context
  const [postsState, postsDispatch] = useReducer(postsReducer, postsInitialState);

  const signIn = () => {
    signDispatch({ type: "SIGN_IN" });
  };

  const signOut = () => {
    signDispatch({ type: "SIGN_OUT" });
  };

  const setPosts = (posts) => {
    postsDispatch({type: "SET_DATA", posts})
  }

  const entireContext = {
    isSignIn: signState,
    posts: postsState,
    setPosts,
    signIn,
    signOut,
  };

  return <EntireContext.Provider value={entireContext}>{children}</EntireContext.Provider>;
};

export default EntireProvider;
