import GlobalStyle from "./styles/GlobalStyle";
import Routes from "./routes";
import EntireContext from "./Context/EntireContext";
import { useContext, useEffect } from "react";
import supabase from "./supabaseClient";

function App() {
  const { signIn } = useContext(EntireContext);
  // 로그인 상태 동기화
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      session && signIn(session.user);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Routes />
    </>
  );
}

export default App;
