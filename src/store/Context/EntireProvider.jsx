import { useEffect, useReducer } from "react";
import EntireContext from "./EntireContext";
import { signInitialState, signInReducer } from "../reducers/signInReducer";
import { postsInitialState, postsReducer } from "../reducers/postsReducer";
import supabase from "../../supabaseClient";

const EntireProvider = ({ children }) => {
  // 로그인 context
  const [userInfo, userInfoDispatch] = useReducer(signInReducer, signInitialState);
  // 게시물 context
  const [postsState, postsDispatch] = useReducer(postsReducer, postsInitialState);

  const setAllPosts = (allPosts) => {
    postsDispatch({ type: "ALL_POSTS", allPosts });
  };

  const setDisplayedPosts = (displayedPosts) => {
    postsDispatch({ type: "DISPLAYED_POSTS", displayedPosts });
  };

  const entireContext = {
    userInfo,
    allPosts: postsState.allPosts,
    displayedPosts: postsState.displayedPosts,
    setAllPosts,
    setDisplayedPosts,
    signIn: (payload) => userInfoDispatch({ type: "SIGN_IN", payload }),
    signOut: () => userInfoDispatch({ type: "SIGN_OUT" })
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      session && userInfoDispatch({ type: "SIGN_IN", payload: session.user });
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return <EntireContext.Provider value={entireContext}>{children}</EntireContext.Provider>;
};

export default EntireProvider;

