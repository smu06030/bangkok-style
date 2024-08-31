import { useState } from "react";
import SignInput from "../../components/SignInputs";
import { useNavigate } from "react-router-dom";
import useSignInHandler from "../../hooks/useSignInHandler";
import { NavGuide, SignBtn, SignFrom, SignNav } from "../../styles/SignStyles";
import styled from "styled-components";
import { EMAIL_INPUT_REGEX, EMAIL_REGEX, PASSWORD_INPUT_REGEX, PASSWORD_REGEX } from "../../constant/regularExpression";

const SignIn = () => {
  const navigate = useNavigate();
  const { onSignInHandler, signInWithGithub } = useSignInHandler();
  const [signInInputs, setSignInInputs] = useState({ email: "", password: "" });

  return (
    <>
      <h2>로그인</h2>
      <SignFrom>
        <SignInput
          firstFocus={true}
          regex={EMAIL_INPUT_REGEX}
          inputs={signInInputs}
          setInputs={setSignInInputs}
          label={"아이디"}
          name={"email"}
          type={"text"}
          placeholder={"이메일을 입력해주세요."}
          terms={EMAIL_REGEX.test(signInInputs.email) || "이메일 형식으로 입력해주세요."}
        />
        <SignInput
          regex={PASSWORD_INPUT_REGEX}
          inputs={signInInputs}
          setInputs={setSignInInputs}
          label={"비밀번호"}
          name={"password"}
          type={"password"}
          placeholder={"비밀번호를 입력해주세요."}
          terms={
            PASSWORD_REGEX.test(signInInputs.password) ||
            "비밀번호는 숫자, 영어, 특수문자를 포함한 8자 이상 15자 이하입니다."
          }
        />
        <BtnBundle>
          <SignBtn onClick={(e) => onSignInHandler(e, signInInputs)}>로그인</SignBtn>
          <SignBtn onClick={(e) => signInWithGithub(e)}>github 로그인</SignBtn>
        </BtnBundle>
        <NavGuide>
          <SignNav onClick={() => navigate("/password-recovery")}>비밀번호 찾기</SignNav>
          <SignNav onClick={() => navigate("/sign-up")}>회원가입하기</SignNav>
        </NavGuide>
      </SignFrom>{" "}
    </>
  );
};

export default SignIn;

const BtnBundle = styled.div`
  display: flex;
  gap: 10px;
`;
