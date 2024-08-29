import { useState } from "react";
import supabase from "../../supabaseClient";
import SignInputs from "../../components/SignInputs";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpInputs, setIdInputs] = useState({ email: "", password: "", verifyPassword: "", nickname: "" });

  const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  const password_regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  const onSignUpHandler = async (event) => {
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
      navigate("/sign-in", { state: { email: signUpInputs.email, password: signUpInputs.password } });
    } else {
      alert("회원가입에 실패했습니다.");
    }
  };

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
      <button onClick={(e) => onSignUpHandler(e)}>회원가입</button>
    </form>
  );
};

export default SignUp;
