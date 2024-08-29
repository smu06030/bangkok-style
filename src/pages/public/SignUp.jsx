import { useState } from "react";
import supabase from "../../supabaseClient";
import SignInputs from "../../components/SignInputs";

const SignUp = () => {
  const [idInputs, setIdInputs] = useState({ email: "", password: "", verifyPassword: "", nickname: "" });

  const onSignUpSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: idInputs.email,
      password: idInputs.password,
      options: {
        data: {
          nickname: idInputs.nickname
        }
      }
    });
    console.log("data", data);
    // if (data) {
    //   alert("회원가입 완료");
    //   return;
    // }
    // if (error) {
    //   alert("회원가입 실패");
    //   return;
    // }
  };

  const signUpInputs = [
    { label: "아이디", name: "email", type: "email", placeholder: "이메일을 입력해주세요." },
    { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력해주세요." },
    { label: "비밀번호 확인", name: "verifyPassword", type: "password", placeholder: "비밀번호 재입력" },
    { label: "닉네임", name: "nickname", type: "text", placeholder: "닉네임을 입력해주세요." }
  ];

  return (
    <form>
      <fieldset>
        {signUpInputs.map((element, index) => {
          return <SignInputs key={index} idInputs={idInputs} setIdInputs={setIdInputs} element={element} />;
        })}
      </fieldset>
      <button onClick={(e) => onSignUpSubmit(e)}>회원가입</button>
    </form>
  );
};

export default SignUp;
