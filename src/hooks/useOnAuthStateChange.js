import { useEffect } from "react";
import supabase from "../supabaseClient";
import { useCustomDispatch } from "../hooks/useSelector";

// 유저정보를 실시간으로 context에 저장하는 함수
const useOnAuthStateChange = () => {
  const { signIn } = useCustomDispatch((dispatch) => dispatch.userInfo);

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
