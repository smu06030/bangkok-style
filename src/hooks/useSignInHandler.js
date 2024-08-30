import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { useContext } from "react";
import EntireContext from "../store/Context/EntireContext";

const useSignInHandler = () => {
  const navigate = useNavigate();
  const { signIn, signOut } = useContext(EntireContext);

  const onSignInHandler = async (event, signInInputs) => {
    event.preventDefault();
    const { data } = await supabase.auth.signInWithPassword({
      email: signInInputs.email,
      password: signInInputs.password
    });

    if (data.user) {
      signIn();
      window.localStorage.setItem("signIn", true);
      alert("로그인이 완료되었습니다.");
      navigate("/");
    } else {
      alert("존재하지 않는 계정입니다.");
    }
  };

  const onSignOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("로그아웃에 실패했습니다.");
      return;
    }
    signOut();
    window.localStorage.removeItem("signIn");
    alert("로그아웃 하였습니다.");
    window.location.reload();
  };

  return { onSignInHandler, onSignOutHandler };
};

export default useSignInHandler;
