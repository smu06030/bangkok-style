import { useEffect, useReducer } from "react";
import EntireContext from "./EntireContext";
import { signInitialState, signInReducer } from "../reducers/signInReducer";
import { postsInitialState, postsReducer } from "../reducers/postsReducer";
import supabase from "../../supabaseClient";

const EntireProvider = ({ children }) => {
  // 로그인 context
  const [signState, signDispatch] = useReducer(signInReducer, signInitialState);
  // 게시물 context
  const [postsState, postsDispatch] = useReducer(postsReducer, postsInitialState);

  const setPosts = (posts) => {
    postsDispatch({ type: "SET_DATA", posts });
  };

  const entireContext = {
    isSignIn: signState,
    posts: postsState,
    setPosts,
    signIn: (payload) => signDispatch({ type: "SIGN_IN", payload }),
    signOut: () => signDispatch({ type: "SIGN_OUT" })
  };

  useEffect(() => {
    const getSession = async () => {
      const response = await supabase.auth.getSession();
      signDispatch({ type: "SIGN_IN", payload: response.data.session.user });
    };
    getSession();

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      console.log("session", session.user);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return <EntireContext.Provider value={entireContext}>{children}</EntireContext.Provider>;
};

export default EntireProvider;
