import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { useContext } from "react";
import EntireContext from "../store/Context/EntireContext";

const useSignInHandler = () => {
  const navigate = useNavigate();
  const { signOut } = useContext(EntireContext);

  const onSignInHandler = async (event, signInInputs) => {
    event.preventDefault();
    const { data } = await supabase.auth.signInWithPassword({
      email: signInInputs.email,
      password: signInInputs.password
    });

    if (data.user) {
      alert("로그인이 완료되었습니다.");
      navigate("/");
    } else {
      alert("존재하지 않는 계정입니다.");
    }
  };

  const onSignOutHandler = async () => {
    if (confirm("정말 로그아웃 하시겠습니까?")) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert(error.message);
        return;
      }
      signOut();
      alert("로그아웃 하였습니다.");
    } else {
      alert("로그아웃을 취소했습니다.");
    }
  };
  return { onSignInHandler, onSignOutHandler };
};

export default useSignInHandler;
