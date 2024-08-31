import { useEffect, useRef, useState } from "react";
import SignInput from "../../components/SignInputs";
import { useNavigate } from "react-router-dom";
import useSignInHandler from "../../hooks/useSignInHandler";
import supabase from "../../supabaseClient";
import { SignBtn, SignFieldset, SignFrom } from "../../styles/SignStyles";
import styled from "styled-components";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../constant/regularExpression";

const SignIn = () => {
  const navigate = useNavigate();
  const { onSignInHandler } = useSignInHandler();
  const [signInInputs, setInInputs] = useState({ email: "", password: "" });

  // const idRef = useRef();
  // useEffect(() => {
  // idRef.current.focus();
  // }, []);

  const signInWithGithub = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github"
    });
    if (data) {
      alert("로그인이 완료되었습니다.");
    } else {
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <SignFrom>
      <SignFieldset>
        <SignInput
          // ref={idRef}
          inputs={signInInputs}
          setInputs={setInInputs}
          label={"아이디"}
          name={"email"}
          type={"text"}
          placeholder={"이메일을 입력해주세요."}
          terms={
            EMAIL_REGEX.test(signInInputs.email) || "한글과 특수문자를 포함하지 않는 이메일 형식으로 입력해주세요."
          }
        />
        <SignInput
          inputs={signInInputs}
          setInputs={setInInputs}
          label={"비밀번호"}
          name={"password"}
          type={"password"}
          placeholder={"비밀번호를 입력해주세요."}
          terms={
            PASSWORD_REGEX.test(signInInputs.password) ||
            "숫자, 영어, 특수문자를 포함한 8자 이상, 15자 이하로 입력해주세요."
          }
        />
      </SignFieldset>
      <BtnBundle>
        <SignBtn onClick={(e) => onSignInHandler(e, signInInputs)}>로그인</SignBtn>
        <SignBtn onClick={(e) => signInWithGithub(e)}>github 로그인</SignBtn>
      </BtnBundle>
      <SignUpNav>
        <p>회원이 아니신가요?</p>
        <nav style={{ cursor: "pointer" }} onClick={() => navigate("/sign-up")}>
          회원가입
        </nav>
      </SignUpNav>
    </SignFrom>
  );
};

export default SignIn;

const BtnBundle = styled.div`
  display: flex;
  gap: 8px;
`;

const SignUpNav = styled.nav`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  gap: 8px;
`;
