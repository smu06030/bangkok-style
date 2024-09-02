import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignInHandler from "../../hooks/useSignInHandler";
import { NavGuide, SignBtn, SignFrom, SignNav } from "../../components/UI/SignStyles";
import { EMAIL_REGEX } from "../../constant/regularExpression";
import { Toaster } from "sonner";
import URLS from "../../constant/urls";
import SignInput from "../../components/UI/SignInput";
import styled from "styled-components";

const PasswordReset = () => {
  const navigate = useNavigate();
  const { recoveryPassword } = useSignInHandler();
  const [emailInput, setEmailInput] = useState({ email: "" });

  return (
    <>
      <Toaster position="top-center" richColors />
      <h2>비밀번호 찾기</h2>
      <ResetAlert>비밀번호 찾기 시 비밀번호가 초기화됩니다.</ResetAlert>
      <SignFrom>
        <SignInput
          firstFocus={true}
          inputs={emailInput}
          setInputs={setEmailInput}
          label={"이메일"}
          name={"email"}
          type={"text"}
          placeholder={"이메일을 입력해주세요."}
          terms={EMAIL_REGEX.test(emailInput.email) || "이메일 형식으로 입력해주세요."}
        />
        <SignBtn $large={true} onClick={(e) => recoveryPassword(e, emailInput)}>
          비밀번호 찾기
        </SignBtn>
        <NavGuide>
          <SignNav onClick={() => navigate(URLS.signUp)}>회원가입하기</SignNav>
          <SignNav onClick={() => navigate(URLS.signIn)}>로그인하기</SignNav>
        </NavGuide>
      </SignFrom>
    </>
  );
};

export default PasswordReset;

const ResetAlert = styled.p`
  display: flex;
  justify-content: center;
  font-size: 18px;
  margin: 10px;
  color: red;
`;