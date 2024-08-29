import { useContext, useState } from "react";
import SignInputs from "../../components/SignInputs";
import supabase from "../../supabaseClient";
import EntireContext from "../../store/Context/EntireContext";

const SignIn = () => {
  const { signIn } = useContext(EntireContext);
  const [signInInputs, setInInputs] = useState({ email: "", password: "" });

  const onSignInHandler = async (event) => {
    event.preventDefault();
    const { data } = await supabase.auth.signInWithPassword({
      email: signInInputs.email,
      password: signInInputs.password
    });
    if (data.user) {
      signIn();
      alert("로그인이 완료되었습니다.");
    } else {
      alert("로그인에 실패했습니다.");
    }
  };

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
      {/* <button onClick={(e) => signInWithGithub(e)}>github 회원가입</button> */}
      <button onClick={(e) => onSignInHandler(e)}>로그인</button>
    </form>
  );
};

export default SignIn;
