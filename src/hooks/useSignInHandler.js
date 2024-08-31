import supabase from "../supabaseClient";
import { useContext } from "react";
import EntireContext from "../Context/EntireContext";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constant/regularExpression";

const useSignInHandler = () => {
  const { signOut } = useContext(EntireContext);

  // 로그인 함수
  const onSignInHandler = async (event, signInInputs) => {
    event.preventDefault();
    if (!EMAIL_REGEX.test(signInInputs.email)) {
      alert("잘못된 아이디입니다.");
      return;
    }

    if (!PASSWORD_REGEX.test(signInInputs.password)) {
      alert("잘못된 비밀번호입니다.");
      return;
    }

    const { data } = await supabase.auth.signInWithPassword({
      email: signInInputs.email,
      password: signInInputs.password
    });

    if (!data.user) {
      alert("존재하지 않는 계정입니다.");
    }
  };

  // 로그아웃 함수
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
