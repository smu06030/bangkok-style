import { useState } from "react";
import SignInputs from "../../components/SignInputs";
import useSignUpHandler from "../../hooks/useSignUpHandler";

const SignUp = () => {
  const { onSignUpHandler } = useSignUpHandler();
  const [signUpInputs, setIdInputs] = useState({ email: "", password: "", verifyPassword: "", nickname: "" });

  const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  const password_regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  const signUpInputsElements = [
    {
      label: "아이디",
      name: "email",
      type: "email",
      placeholder: "이메일을 입력해주세요.",
      terms: email_regex.test(signUpInputs.email) || "한글과 특수문자를 포함하지 않는 이메일 형식으로 입력해주세요."
    },
    {
      label: "비밀번호",
      name: "password",
      type: "password",
      placeholder: "비밀번호를 입력해주세요.",
      terms:
        password_regex.test(signUpInputs.password) ||
        "숫자, 영어, 특수문자를 포함한 8자 이상, 15자 이하로 입력해주세요."
    },
    {
      label: "비밀번호 확인",
      name: "verifyPassword",
      type: "password",
      placeholder: "비밀번호 재입력",
      terms: signUpInputs.password === signUpInputs.verifyPassword || "입력한 비밀번호와 다릅니다."
    },
    {
      label: "닉네임",
      name: "nickname",
      type: "text",
      placeholder: "닉네임을 입력해주세요.",
      terms: signUpInputs.nickname.trim().length === 0 && "닉네임을 입력하여주세요."
    }
  ];

  return (
    <form>
      <fieldset>
        {signUpInputsElements.map((element, index) => {
          return <SignInputs key={index} inputs={signUpInputs} setInputs={setIdInputs} element={element} />;
        })}
      </fieldset>
      <button onClick={(e) => onSignUpHandler(e, signUpInputs)}>회원가입</button>
    </form>
  );
};

export default SignUp;
