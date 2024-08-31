import supabase from "../supabaseClient";
import { useContext } from "react";
import EntireContext from "../Context/EntireContext";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constant/regularExpression";
import { toast } from "sonner";

const useSignInHandler = () => {
  const { signOut } = useContext(EntireContext);

  // 로그인 함수
  const onSignInHandler = async (event, enteredInfo) => {
    event.preventDefault();
    if (!enteredInfo.email.trim()) {
      toast.error("아이디를 입력해주세요.");
      return;
    }

    if (!EMAIL_REGEX.test(enteredInfo.email)) {
      toast.error("아이디를 이메일 형식으로 입력해주세요.");
      return;
    }

    if (!enteredInfo.password.trim()) {
      toast.error("비밀번호를 입력해주세요.");
      return;
    }

    if (!PASSWORD_REGEX.test(enteredInfo.password)) {
      toast.error("비밀번호는 숫자, 특수문자, 영어를 포함해야합니다.");
      return;
    }

    const { data } = await supabase.auth.signInWithPassword({
      email: enteredInfo.email,
      password: enteredInfo.password
    });
    
    if (!data.user) {
      toast.error("존재하지 않는 계정입니다.");
    }
  };

  // github로그인 함수
  const signInWithGithub = async (event) => {
    event.preventDefault();
    const response = await supabase.auth.signInWithOAuth({
      provider: "github"
    });
    toast.promise(response, {
      loading: "잠시만 기다려주세요.",
      error: "로그인에 실패했습니다."
    });
  };

  // 로그아웃 함수
  const onSignOutHandler = () => {
    toast.warning("정말 로그아웃 하시겠습니까?", {
      action: {
        label: "로그아웃",
        onClick: async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            toast.error(error.message);
            return;
          }
          signOut();
          return;
        }
      }
    });
  };

  // 비밀번호 찾기 함수
  const recoveryPassword = async (event, enteredInfo) => {
    event.preventDefault();
    if (!enteredInfo.email.trim()) {
      toast.error("이메일을 입력해주세요.");
      return;
    }

    if (!EMAIL_REGEX.test(enteredInfo.email)) {
      toast.error("잘못된 이메일입니다.");
      return;
    }
    const { data } = await supabase.auth.resetPasswordForEmail(enteredInfo.email);
    if (data) {
      toast.success("메일을 전송하였습니다. 메일을 확인해주세요.");
      return;
    }
  };

  return { onSignInHandler, signInWithGithub, onSignOutHandler, recoveryPassword };
};

export default useSignInHandler;
