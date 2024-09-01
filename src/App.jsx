import GlobalStyle from "./styles/GlobalStyle";
import Routes from "./routes";
import useOnAuthStateChange from "./hooks/useOnAuthStateChange";

function App() {
  // 유저 정보를 context의 userInfo와 동기화
  useOnAuthStateChange();

  return (
    <>
      <GlobalStyle />
      <Routes />
    </>
  );
}

export default App;
