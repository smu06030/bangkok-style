import EntireContext from "./EntireContext";
import PostsContext from "./PostsContext";
import UserInfoContext from "./UserInfoContext";

const ContextProvider = ({ children }) => {
  // context provider의 value에 할당할 객체
  const contextValues = {
    ...UserInfoContext(),
    ...PostsContext()
  };

  return <EntireContext.Provider value={contextValues}>{children}</EntireContext.Provider>;
};

export default ContextProvider;
