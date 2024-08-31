import { useState } from "react";
import useSignUpHandler from "../../hooks/useSignUpHandler";
import SignInput from "../../components/SignInputs";
import { EMAIL_INPUT_REGEX, EMAIL_REGEX, PASSWORD_INPUT_REGEX, PASSWORD_REGEX } from "../../constant/regularExpression";
import { NavGuide, SignBtn, SignFrom, SignNav } from "../../styles/SignStyles";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();
  const { onSignUpHandler } = useSignUpHandler();
  const [signUpInputs, setSignUpInputs] = useState({ email: "", password: "", verifyPassword: "", nickname: "" });

  return (
    <>
      <Toaster position="top-center" richColors />
      <h2>회원가입</h2>
      <SignFrom>
        <SignInput
          firstFocus={true}
          regex={EMAIL_INPUT_REGEX}
          inputs={signUpInputs}
          setInputs={setSignUpInputs}
          label={"아이디"}
          name={"email"}
          type={"text"}
          placeholder={"이메일을 입력해주세요."}
          terms={
            EMAIL_REGEX.test(signUpInputs.email) || "한글과 특수문자를 포함하지 않는 이메일 형식으로 입력해주세요."
          }
        />
        <SignInput
          regex={PASSWORD_INPUT_REGEX}
          inputs={signUpInputs}
          setInputs={setSignUpInputs}
          label={"비밀번호"}
          name={"password"}
          type={"password"}
          placeholder={"비밀번호를 입력해주세요."}
          terms={
            PASSWORD_REGEX.test(signUpInputs.password) ||
            "숫자, 영어, 특수문자를 포함한 8자 이상, 15자 이하로 입력해주세요."
          }
        />
        <SignInput
          regex={PASSWORD_INPUT_REGEX}
          inputs={signUpInputs}
          setInputs={setSignUpInputs}
          label={"비밀번호 확인"}
          name={"verifyPassword"}
          type={"password"}
          placeholder={"비밀번호 재입력"}
          terms={signUpInputs.password === signUpInputs.verifyPassword || "입력한 비밀번호와 다릅니다."}
        />
        <SignInput
          inputs={signUpInputs}
          setInputs={setSignUpInputs}
          label={"닉네임"}
          name={"nickname"}
          type={"text"}
          placeholder={"닉네임을 입력해주세요."}
          terms={signUpInputs.nickname.trim().length === 0 && "닉네임을 입력해주세요."}
        />
        <SignBtn $large={true} onClick={(e) => onSignUpHandler(e, signUpInputs)}>
          회원가입
        </SignBtn>
        <NavGuide>
          <SignNav onClick={() => navigate("/password-recovery")}>비밀번호 찾기</SignNav>
          <SignNav onClick={() => navigate("/sign-in")}>로그인하기</SignNav>
        </NavGuide>
      </SignFrom>
    </>
  );
};

export default SignUp;
