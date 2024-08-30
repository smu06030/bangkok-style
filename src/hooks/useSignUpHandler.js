import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const useSignUpHandler = () => {
  const navigate = useNavigate();
  const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  const password_regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  
  const onSignUpHandler = async (event, signUpInputs) => {
    event.preventDefault();
    if (!email_regex.test(signUpInputs.email)) {
      alert("잘못된 아이디입니다.");
      return;
    }

    if (!password_regex.test(signUpInputs.password)) {
      alert("잘못된 비밀번호입니다.");
      return;
    }

    if (signUpInputs.password !== signUpInputs.verifyPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (signUpInputs.nickname.trim().length === 0) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: signUpInputs.email,
      password: signUpInputs.password,
      options: {
        data: {
          nickname: signUpInputs.nickname
        }
      }
    });

    if (error.message === "User already registered") {
      alert("이미 존재하는 아이디입니다.");
      return;
    }
    if (data.user) {
      alert("회원가입이 완료되었습니다.");
      navigate("/sign-in", { state: { email: signUpInputs.email, password: signUpInputs.password } });
    } else {
      alert("회원가입에 실패했습니다.");
      console.log(error.message);
    }
  };
  return { onSignUpHandler };
};

export default useSignUpHandler;
