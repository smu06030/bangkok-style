import GlobalStyle from "./styles/GlobalStyle";
import Routes from "./routes";
import useOnAuthStateChange from "./hooks/useOnAuthStateChange";

function App() {
  // 로그인 상태 동기화
  useOnAuthStateChange();

  return (
    <>
      <GlobalStyle />
      <Routes />
    </>
  );
}

export default App;
