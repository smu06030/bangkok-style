import supabase from "../supabaseClient";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constant/regularExpression";
import { toast } from "sonner";

const useSignUpHandler = () => {
  // 회원가입 함수
  const onSignUpHandler = async (event, enteredInfo) => {
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

    if (enteredInfo.password !== enteredInfo.verifyPassword) {
      toast.error("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (!enteredInfo.nickname.trim()) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: enteredInfo.email,
      password: enteredInfo.password,
      options: {
        data: {
          nickname: enteredInfo.nickname
        }
      }
    });

    if (error?.message === "User already registered") {
      toast.error("이미 존재하는 아이디입니다.");
      return;
    }
    if (!data.user) {
      toast.error(`${error.message}, 회원가입에 실패했습니다.`);
    }
  };
  return { onSignUpHandler };
};

export default useSignUpHandler;
