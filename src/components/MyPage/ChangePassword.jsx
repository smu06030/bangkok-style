import React, { useContext, useState } from "react";
import EntireContext from "../../Context/EntireContext";
import styled from "styled-components";

const IdBox = styled.div`
  display: flex;
`;

const ChangePassword = () => {
  const [password, SetPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { userInfo } = useContext(EntireContext);
  console.log("userInfo :>> ", userInfo);
  // const { data, error } = await supabase.auth.updateUser({
  //     password: "new-password",
  //   })

  return (
    <>
      <button>회원정보 수정</button>
      <div>
        <p>회원정보 수정</p>
        <IdBox>
          <p>▸ 아이디</p>
          <p>{userInfo.email}</p>
        </IdBox>
        <div>
          <label htmlFor="password">▸ 현재 비밀번호</label>
          <input type="password" id="password" />
        </div>
        <div>
          <label htmlFor="new-password">▸ 변경 비밀번호</label> <input type="password" id="new-password" />
        </div>
        <p>숫자, 영어, 특수문자를 포함한 8자 이상, 15자 이하로 입력해주세요.</p>
        <div>
          <label htmlFor="check-password">▸ 비밀번호 확인</label>
          <input type="password" id="check-password" />
        </div>
        <button>취소</button>
        <button>수정</button>
      </div>
    </>
  );
};

export default ChangePassword;
