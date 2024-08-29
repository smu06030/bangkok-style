import { useEffect, useState } from "react";
import SignInputs from "../../components/SignInputs";
import supabase from "../../supabaseClient";
import { useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [signInInputs, setInInputs] = useState({ email: "", password: "" });

  const signUpInfo = useLocation().state ?? { email: "", password: "" };
  useEffect(() => {
    signUpInfo && setInInputs({ email: signUpInfo.email, password: signUpInfo.password });
  }, []);

  const onSignInHandler = async (event) => {
    event.preventDefault();
    const { data } = await supabase.auth.signInWithPassword({
      email: signInInputs.email,
      password: signInInputs.password
    });
    if (data.user) {
      window.localStorage.setItem("signIn", true);
      alert("로그인이 완료되었습니다.");
      navigate("/");
      window.location.reload();
    } else {
      alert("로그인에 실패했습니다.");
    }
  };

  // const signInWithGithub = async (event) => {
  //   event.preventDefault();
  //   const { data } = await supabase.auth.signInWithOAuth({
  //     provider: "github"
  //   });
  //   console.log("data", data);
  //   if (data) {
  //   window.localStorage.setItem("signIn", true);
  //     alert("로그인이 완료되었습니다.");
  //   } else {
  //     alert("로그인에 실패했습니다.");
  //   }
  // };

  const signInInputsElements = [
    { label: "아이디", name: "email", type: "text", placeholder: "이메일을 입력해주세요." },
    { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력해주세요." }
  ];
  return (
    <form>
      <fieldset>
        {signInInputsElements.map((element, index) => {
          return <SignInputs key={index} inputs={signInInputs} setInputs={setInInputs} element={element} />;
        })}
      </fieldset>
      <button onClick={(e) => onSignInHandler(e)}>로그인</button>
      {/* <button onClick={(e) => signInWithGithub(e)}>github 로그인</button> */}
      <button onClick={() => navigate("/sign-up")}>회원가입</button>
    </form>
  );
};

export default SignIn;
