import { useReducer } from "react";
import EntireContext from "./EntireContext";
import { signInitialState, signInReducer } from "../reducers/signInReducer";

const EntireProvider = ({ children }) => {
  // sign
  const [signState, signDispatch] = useReducer(signInReducer, signInitialState);

  const signIn = () => {
    signDispatch({ type: "SIGN_IN" });
  };

  const signOut = () => {
    signDispatch({ type: "SIGN_OUT" });
  };

  const signContext = {
    isSignIn: signState,
    signIn,
    signOut
  };

  return <EntireContext.Provider value={signContext}>{children}</EntireContext.Provider>;
};

export default EntireProvider;
