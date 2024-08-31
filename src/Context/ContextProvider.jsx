import EntireContext from "./EntireContext";
import PostsValues from "./PostsValues";
import UserInfoValues from "./UserInfoValues";

const ContextProvider = ({ children }) => {
  // context provider의 value에 할당할 객체
  const contextValues = {
    ...UserInfoValues(),
    ...PostsValues()
  };

  return <EntireContext.Provider value={contextValues}>{children}</EntireContext.Provider>;
};

export default ContextProvider;
