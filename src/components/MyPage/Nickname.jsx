import { useEffect, useState, useContext } from "react";
import EntireContext from "../../Context/EntireContext";
import supabase from "../../supabaseClient";
import styled from "styled-components";

const NicknameContainer = styled.div`
  display: flex;
  margin: 15px 0 0 18px;
`;

const EditInput = styled.input`
  height: 20px;
  border-width: 0 0 1px;
  &:focus {
    outline: none;
  }
  text-align: center;
  font-size: 15px;
`;

const EditBtn = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 15px;
`;

const NicknameText = styled.p`
  font-size: 20px;
`;

const Nickname = () => {
  const [nickname, setNickname] = useState("");
  const [updateNickname, setUpdateNickname] = useState("");
  const [edited, setEdited] = useState(false);
  const { userInfo } = useContext(EntireContext);

  useEffect(() => {
    checkNickname();
  }, []);

  const checkNickname = async () => {
    setNickname(userInfo.user_metadata.nickname);
  };

  const onChangeNickname = (e) => {
    setUpdateNickname(e.target.value);
  };

  const handleNicknameUpdate = async () => {
    const { data } = await supabase.auth.updateUser({
      data: { nickname: updateNickname }
    });
    setNickname(data.user.user_metadata.nickname);
    setUpdateNickname("");
    setEdited(false);
  };

  const handleNicknameEdit = () => {
    setEdited(true);
  };

  return (
    <NicknameContainer>
      {edited ? (
        <EditInput type="text" placeholder="닉네임 입력" value={updateNickname} onChange={onChangeNickname} />
      ) : (
        <NicknameText>{nickname}</NicknameText>
      )}

      {edited ? (
        <EditBtn type="button" onClick={handleNicknameUpdate}>
          ✔️
        </EditBtn>
      ) : (
        <EditBtn type="button" onClick={handleNicknameEdit}>
          ✐
        </EditBtn>
      )}
    </NicknameContainer>
  );
};

export default Nickname;
