import { useContext, useState } from "react";
import EntireContext from "../../Context/EntireContext";
import styled from "styled-components";
import supabase from "../../supabaseClient";
import { PASSWORD_REGEX } from "../../constant/regularExpression";
import { toast } from "sonner";

const ModalOpenBtn = styled.button`
  border: none;
  background-color: white;
  text-decoration-line: underline;
  color: #9f9f9f;
  cursor: pointer;
  margin: 20px;
  &:hover {
    color: #555555;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  padding: 50px;
  text-align: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 5px 5px 5px 0 rgba(70, 70, 70, 0.4);
`;

const ModalContents = styled.div`
  display: grid;
  grid-template-columns: 125px 1fr;
  row-gap: 20px;
  margin-top: 50px;
  text-align: start;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  color: rgba(0, 0, 0, 0.7);
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
`;

const EmailText = styled.p`
  font-size: 15px;
`;

const PasswordInput = styled.input`
  border-width: 0 0 1px;
  &:focus {
    outline: none;
  }
`;

const ConfirmMessage = styled.p`
  color: red;
  font-size: 11px;
  grid-column: span 2;
`;

const ConfirmBtn = styled.button`
  border: none;
  padding: 10px;
  width: 80px;
  margin: 35px 5px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(p) => (p.name ? "black" : "#DDDDDD")};
  color: ${(p) => (p.name ? "white" : "black")};
  &:hover {
    background-color: ${(p) => (p.name ? "#383838" : "#c8c8c8")};
  }
`;

const ChangePassword = () => {
  // 비밀번호, 비밀번호 확인
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const { userInfo } = useContext(EntireContext);
  const userProvider = userInfo.app_metadata.provider;

  const [modal, setModal] = useState(false);

  // 변경 비밀번호
  const onChangePassword = (e) => {
    setNewPassword(e.target.value);
  };

  // 비밀번호 확인
  const onChangeCheckPassword = (e) => {
    setCheckPassword(e.target.value);
  };

  // 비밀번호 변경 실행
  const handleChangePassword = async () => {
    if (newPassword === checkPassword && PASSWORD_REGEX.test(newPassword)) {
      await supabase.auth.updateUser({
        password: newPassword
      });
      toast.success("비밀번호가 변경되었습니다.");
      setModal(!modal);
      handleSetInit();
    } else {
      toast.error("비밀번호가 일치하지 않습니다.");
      handleSetInit();
    }
  };

  // input 초기화
  const handleSetInit = () => {
    setNewPassword("");
    setCheckPassword("");
  };

  // 모달 열고 닫기
  const handleClickModal = () => {
    setModal(!modal);
    handleSetInit();
  };

  return (
    <>
      {userProvider === "email" ? (
        <>
          <ModalOpenBtn type="button" onClick={handleClickModal}>
            회원정보 수정
          </ModalOpenBtn>
          {modal && (
            <Modal onClick={handleClickModal}>
              <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseBtn onClick={handleClickModal}>✖</CloseBtn>
                <p>회원정보 수정</p>
                <ModalContents>
                  <p>▸ 아이디</p>
                  <EmailText>{userInfo.email}</EmailText>
                  <label htmlFor="new-password">▸ 변경 비밀번호</label>
                  <PasswordInput
                    type="password"
                    id="new-password"
                    value={newPassword}
                    onChange={onChangePassword}
                    placeholder="비밀번호"
                  />
                  <ConfirmMessage>
                    {(newPassword.length > 0 && PASSWORD_REGEX.test(newPassword)) ||
                      "비밀번호는 숫자, 영어, 특수문자를 포함한 8자 이상 15자 이하입니다."}
                  </ConfirmMessage>
                  <label htmlFor="check-password">▸ 비밀번호 확인</label>
                  <PasswordInput
                    type="password"
                    id="check-password"
                    value={checkPassword}
                    onChange={onChangeCheckPassword}
                    placeholder="비밀번호 확인"
                  />
                  <ConfirmMessage>
                    {newPassword === checkPassword
                      ? checkPassword
                        ? "비밀번호가 일치합니다."
                        : ""
                      : "비밀번호가 일치하지 않습니다."}
                  </ConfirmMessage>
                </ModalContents>
                <ConfirmBtn onClick={handleClickModal}>취소</ConfirmBtn>
                <ConfirmBtn name="confirm" onClick={handleChangePassword}>
                  확인
                </ConfirmBtn>
              </ModalContainer>
            </Modal>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChangePassword;
