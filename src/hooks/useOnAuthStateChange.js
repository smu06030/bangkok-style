import EntireContext from "../Context/EntireContext";
import { useContext, useEffect } from "react";
import supabase from "../supabaseClient";

// 로그인 상태 동기화
const useOnAuthStateChange = () => {
  const { signIn } = useContext(EntireContext);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      session && signIn(session.user);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
};

export default useOnAuthStateChange;
