import { useContext, useState } from "react";
import EntireContext from "../../Context/EntireContext";
import styled from "styled-components";
import supabase from "../../supabaseClient";
import { PASSWORD_REGEX } from "../../constant/regularExpression";
import { toast } from "sonner";

const IdBox = styled.div`
  display: flex;
`;

// const PasswordContainer = styled.div`

// `

const ChangePassword = () => {
  // 비밀번호, 비밀번호 확인
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const { userInfo } = useContext(EntireContext);
  const userProvider = userInfo.app_metadata.provider;

  // 변경 비밀번호
  const onChangePassword = (e) => {
    setNewPassword(e.target.value);
  };

  // 비밀번호 확인
  const onChangeCheckPassword = (e) => {
    setCheckPassword(e.target.value);
  };

  console.log("newPassword :>>", newPassword);
  console.log("checkPassword :>> ", checkPassword);
  console.log(newPassword === checkPassword);

  // 비밀번호 변경 실행
  const handleChangePassword = async () => {
    if (newPassword === checkPassword) {
      await supabase.auth.updateUser({
        password: newPassword
      });
      toast.success("비밀번호가 변경되었습니다.");
    } else {
      toast.error("비밀번호가 일치하지 않습니다.");
    }
  };

  //   const handleCancel = () => {
  //     return;
  //   };

  const handleToggle = () => {};

  return (
    <>
      {userProvider === "email" ? (
        <>
          <button onClick={handleToggle}>회원정보 수정</button>
          <div>
            <p>회원정보 수정</p>
            <IdBox>
              <p>▸ 아이디</p>
              <p>{userInfo.email}</p>
            </IdBox>
            <div>
              <label htmlFor="new-password">▸ 변경 비밀번호</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={onChangePassword}
                placeholder="비밀번호"
              />
            </div>
            <p>
              {(newPassword.length > 0 && PASSWORD_REGEX.test(newPassword)) ||
                "비밀번호는 숫자, 영어, 특수문자를 포함한 8자 이상 15자 이하입니다."}
            </p>
            <div>
              <label htmlFor="check-password">▸ 비밀번호 확인</label>
              <input
                type="password"
                id="check-password"
                value={checkPassword}
                onChange={onChangeCheckPassword}
                placeholder="비밀번호 확인"
              />
            </div>
            <p>{newPassword === checkPassword ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."}</p>
            {/* <button>취소</button> */}
            <button onClick={handleChangePassword}>수정</button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChangePassword;
