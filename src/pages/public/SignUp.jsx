import { useState } from "react";
import supabase from "../../supabaseClient";
import SignInputs from "../../components/SignInputs";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpInputs, setIdInputs] = useState({ email: "", password: "", verifyPassword: "", nickname: "" });

  const onSignUpHandler = async (event) => {
    event.preventDefault();
    const { data } = await supabase.auth.signUp({
      email: signUpInputs.email,
      password: signUpInputs.password,
      options: {
        data: {
          nickname: signUpInputs.nickname
        }
      }
    });
    if (data.user) {
      alert("회원가입이 완료되었습니다.");
      navigate("/sign-in");
    } else {
      alert("아이디와 비밀번호를 확인해주세요.");
    }
  };

  const signInWithGithub = async (event) => {
    event.preventDefault();
    await supabase.auth.signInWithOAuth({
      provider: "github"
    });
  };

  const signUpInputsElements = [
    { label: "아이디", name: "email", type: "email", placeholder: "이메일을 입력해주세요." },
    { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력해주세요." },
    { label: "비밀번호 확인", name: "verifyPassword", type: "password", placeholder: "비밀번호 재입력" },
    { label: "닉네임", name: "nickname", type: "text", placeholder: "닉네임을 입력해주세요." }
  ];

  return (
    <form>
      <fieldset>
        {signUpInputsElements.map((element, index) => {
          return <SignInputs key={index} inputs={signUpInputs} setInputs={setIdInputs} element={element} />;
        })}
      </fieldset>
      <button onClick={(e) => signInWithGithub(e)}>github 회원가입</button>
      <button onClick={(e) => onSignUpHandler(e)}>회원가입</button>
    </form>
  );
};

export default SignUp;
