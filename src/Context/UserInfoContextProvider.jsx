import { createContext, useCallback, useReducer } from "react";
import { signInitialState, signInReducer } from "../modules/signInReducer";

export const UserInfoStateContext = createContext();
export const UserInfoDispatchContext = createContext();

const UserInfoContextProvider = ({ children }) => {
  // 로그인 state
  const [userInfo, userInfoDispatch] = useReducer(signInReducer, signInitialState);

  const signIn = useCallback((userInfo) => {
    userInfoDispatch({ type: "SIGN_IN", payload: userInfo });
  }, []);

  const signOut = useCallback(() => {
    userInfoDispatch({ type: "SIGN_OUT" });
  }, []);

  return (
    <UserInfoDispatchContext.Provider value={{signIn, signOut}}>
      <UserInfoStateContext.Provider value={userInfo}>{children}</UserInfoStateContext.Provider>
    </UserInfoDispatchContext.Provider>
  );
};

export default UserInfoContextProvider;
