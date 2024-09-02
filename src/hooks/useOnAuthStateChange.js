import EntireContext from "../Context/EntireContext";
import { useContext, useEffect } from "react";
import supabase from "../supabaseClient";

// 유저정보를 context에 저장하는 함수
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
